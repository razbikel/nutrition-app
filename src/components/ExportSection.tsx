import React from 'react';
import { Download, FileText, Database } from 'lucide-react';
import { exportAsJSON, exportAsCSV } from '../utils/export';

export const ExportSection: React.FC = () => {
  const handleExportJSON = async () => {
    try {
      await exportAsJSON();
    } catch (error) {
      console.error("Error exporting JSON:", error);
      alert("אירעה שגיאה ביצוא JSON. נסה שוב.");
    }
  };

  const handleExportCSV = async () => {
    try {
      await exportAsCSV();
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("אירעה שגיאה ביצוא CSV. נסה שוב.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        📊 ייצוא נתונים / Export Data
      </h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleExportJSON}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Database className="w-5 h-5" />
          ייצוא JSON / Export as JSON
        </button>
        
        <button
          onClick={handleExportCSV}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <FileText className="w-5 h-5" />
          ייצוא CSV / Export as CSV
        </button>
      </div>
      
      <p className="text-sm text-gray-600 mt-3 text-center">
        ייצא את כל נתוני התזונה והפעילות לניתוח חיצוני / Export all your nutrition and activity data for external analysis
      </p>
    </div>
  );
};
