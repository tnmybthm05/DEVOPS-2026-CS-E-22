import React from 'react';

const PreferenceCard = ({ category, isSelected, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(category)}
      className={`cursor-pointer border-2 rounded-xl p-4 text-center transition-all duration-200 transform hover:-translate-y-1 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className={`text-2xl ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}>
          {/* We can map specific icons here based on the category string, using a simple hash icon for now */}
          #
        </div>
        <h3 className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
          {category}
        </h3>
      </div>
    </div>
  );
};

export default PreferenceCard;
