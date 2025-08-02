import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDisplayDate, getDateOffset } from '../utils/date';

interface DateNavigationProps {
  currentDate: string;
  onDateChange: (date: string) => void;
}

export const DateNavigation: React.FC<DateNavigationProps> = ({
  currentDate,
  onDateChange
}) => {
  const handlePrevDay = () => {
    onDateChange(getDateOffset(currentDate, -1));
  };

  const handleNextDay = () => {
    onDateChange(getDateOffset(currentDate, 1));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevDay}
          className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-blue-600" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-800 text-center flex-1 mx-4">
          {formatDisplayDate(currentDate)}
        </h2>
        
        <button
          onClick={handleNextDay}
          className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5 text-blue-600" />
        </button>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={currentDate}
            onChange={handleDateInputChange}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};