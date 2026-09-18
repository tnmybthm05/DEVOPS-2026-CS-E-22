import React from 'react';

const categories = [
  'All', 'Technology', 'Sports', 'Business', 
  'Science', 'Entertainment', 'Health', 'General'
];

const CategoryTabs = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex overflow-x-auto hide-scrollbar py-4 mb-6 gap-2 border-b border-gray-200">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
