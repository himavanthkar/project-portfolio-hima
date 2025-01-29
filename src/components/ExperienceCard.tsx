import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Building2, Calendar } from 'lucide-react';

interface StarDetails {
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  starDetails: StarDetails;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  period,
  description,
  starDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Building2 className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-lg text-gray-700 dark:text-gray-300">{company}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Calendar className="w-4 h-4 mr-1" />
            {period}
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700"
        >
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>

      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">
        {description.map((item, index) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))}
      </ul>

      {isExpanded && (
        <div className="mt-6 space-y-4 border-t pt-4 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Situation</h4>
              <p className="text-gray-700 dark:text-gray-300">{starDetails.situation}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Task</h4>
              <p className="text-gray-700 dark:text-gray-300">{starDetails.task}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Action</h4>
              <p className="text-gray-700 dark:text-gray-300">{starDetails.action}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Result</h4>
              <p className="text-gray-700 dark:text-gray-300">{starDetails.result}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};