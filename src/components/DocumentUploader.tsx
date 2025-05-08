import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface DocumentUploaderProps {
  onUpload: (file: File, title: string) => Promise<void>;
  isLoading: boolean;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUpload, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (file && title.trim()) {
      await onUpload(file, title);
      setFile(null);
      setTitle('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Document Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div 
          className={`mb-4 border-2 border-dashed rounded-lg p-6 text-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-blue-500" />
                <div className="text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          ) : (
            <div>
              <Upload size={36} className="mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <label className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md cursor-pointer hover:bg-blue-200 transition-colors duration-200">
                <span>Browse files</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, DOC, DOCX, TXT
              </p>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!file || !title.trim() || isLoading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md transition-colors duration-200 ${
            !file || !title.trim() || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
};

export default DocumentUploader;