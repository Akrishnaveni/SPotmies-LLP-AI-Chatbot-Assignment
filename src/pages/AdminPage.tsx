import React from 'react';
import { observer } from 'mobx-react-lite';
import { documentStore } from '../stores/DocumentStore';
import DocumentItem from '../components/DocumentItem';
import DocumentUploader from '../components/DocumentUploader';
import { Loader2 } from 'lucide-react';

const AdminPage: React.FC = observer(() => {
  const { documents, isLoading, uploadDocument, deleteDocument, error } = documentStore;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Knowledge Base Management</h1>
        <p className="text-gray-600">
          Upload and manage company documents to enhance the AI assistant's knowledge.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="py-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin text-blue-500" />
                  <span>Loading documents...</span>
                </div>
              </div>
            ) : documents.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">No documents uploaded yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <DocumentItem
                    key={doc.id}
                    document={doc}
                    onDelete={deleteDocument}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <DocumentUploader onUpload={uploadDocument} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
});

export default AdminPage;