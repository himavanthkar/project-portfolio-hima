import React from 'react';
import { Download } from 'lucide-react';

export const ResumeDownload: React.FC = () => {
  const handleDownload = () => {
    window.open('/resume.pdf', '_blank');
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg w-full md:w-auto text-lg font-medium"
    >
      <Download className="w-6 h-6 mr-3" />
      Download Resume
    </button>
  );
};