import React, { useState, useEffect } from 'react';
import { Save, Edit3 } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
  onSummaryChange: (summary: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  onSummaryChange
}) => {
  const [localSummary, setLocalSummary] = useState(summary);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalSummary(summary);
  }, [summary]);

  const handleSave = () => {
    onSummaryChange(localSummary);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        📝 סיכום יומי / Daily Summary
      </h3>
      
      <div className="space-y-3">
        <textarea
          value={localSummary}
          onChange={(e) => setLocalSummary(e.target.value)}
          onFocus={() => setIsEditing(true)}
          onKeyDown={handleKeyDown}
          placeholder="איך הרגשת היום? הערות על התזונה או הפעילות... / How did you feel today? Any notes about your nutrition or activities..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          dir="auto"
          rows={4}
        />
        
        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              שמור סיכום / Save Summary
            </button>
            <button
              onClick={() => {
                setLocalSummary(summary);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              ביטול / Cancel
            </button>
          </div>
        )}
        
        {!isEditing && summary && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-gray-800 whitespace-pre-wrap" dir="auto">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};