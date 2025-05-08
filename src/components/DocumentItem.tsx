import React from 'react';
import { Document } from '../types';
import { FileText, Trash2 } from 'lucide-react';

interface DocumentItemProps {
  document: Document;
  onDelete: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ document, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText size={20} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{document.title}</h3>
          <p className="text-sm text-gray-500">
            {document.fileType.toUpperCase()} • Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(document.id)}
        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
        aria-label="Delete document"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default DocumentItem;