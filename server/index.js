import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Load environment variables
config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS
app.use(cors());
app.use(express.json());

// Set up file storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Mock database (in memory for demonstration)
let documents = [
  {
    id: '1',
    title: 'Company FAQ',
    content: 'Frequently Asked Questions about Spotmies LLP...',
    fileType: 'pdf',
    uploadDate: new Date('2023-05-15')
  },
  {
    id: '2',
    title: 'Product Manual',
    content: 'Detailed instructions for using Spotmies products...',
    fileType: 'docx',
    uploadDate: new Date('2023-06-20')
  }
];

let chatSessions = {};

// Auth routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple authentication for demo
  if (username === 'admin' && password === 'admin123') {
    return res.json({
      id: '1',
      username: 'admin',
      isAdmin: true
    });
  } else if (username === 'user' && password === 'user123') {
    return res.json({
      id: '2',
      username: 'user',
      isAdmin: false
    });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Document routes
app.get('/api/documents', (req, res) => {
  res.json(documents);
});

app.post('/api/documents', upload.single('file'), (req, res) => {
  const { title } = req.body;
  const file = req.file;
  
  if (!file || !title) {
    return res.status(400).json({ error: 'File and title are required' });
  }
  
  // In a real app, we would process the file content here
  const newDocument = {
    id: Date.now().toString(),
    title,
    content: `Content of ${title}...`, // This would come from the file
    fileType: path.extname(file.originalname).substring(1),
    uploadDate: new Date()
  };
  
  documents.push(newDocument);
  res.status(201).json(newDocument);
});

app.delete('/api/documents/:id', (req, res) => {
  const { id } = req.params;
  
  const initialLength = documents.length;
  documents = documents.filter(doc => doc.id !== id);
  
  if (documents.length === initialLength) {
    return res.status(404).json({ error: 'Document not found' });
  }
  
  res.status(204).send();
});

// Chat routes
app.get('/api/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!chatSessions[sessionId]) {
    chatSessions[sessionId] = [];
  }
  
  res.json(chatSessions[sessionId]);
});

app.post('/api/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  if (!chatSessions[sessionId]) {
    chatSessions[sessionId] = [];
  }
  
  // Add user message
  const userMessage = {
    id: Date.now().toString(),
    text: message,
    sender: 'user',
    timestamp: new Date()
  };
  
  chatSessions[sessionId].push(userMessage);
  
  // In a real app, this is where we'd call the Gemini API
  // For demo, we'll generate a simple response
  const response = getAIResponse(message, documents);
  
  // Add AI response
  const aiMessage = {
    id: (Date.now() + 1).toString(),
    text: response,
    sender: 'ai',
    timestamp: new Date()
  };
  
  chatSessions[sessionId].push(aiMessage);
  
  res.json(aiMessage);
});

// Helper function to simulate AI responses
function getAIResponse(message, documents) {
  const lowerMessage = message.toLowerCase();
  
  // Check for document-related queries
  for (const doc of documents) {
    if (lowerMessage.includes(doc.title.toLowerCase())) {
      return `Based on our ${doc.title}, ${doc.content}`;
    }
  }
  
  // Generic responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! I'm the Spotmies AI assistant. How can I help you today?";
  } else if (lowerMessage.includes('help')) {
    return "I'm here to help! You can ask me questions about Spotmies' products, services, or general inquiries.";
  } else if (lowerMessage.includes('product') || lowerMessage.includes('service')) {
    return "Spotmies offers a range of innovative products and services. For detailed information, please visit our website or ask me specific questions about what you're looking for.";
  } else {
    return "I understand your question. In a fully implemented version, I would search through our knowledge base to provide the most accurate answer. Is there anything specific about Spotmies you'd like to know?";
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});