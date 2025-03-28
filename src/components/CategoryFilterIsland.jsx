import { useState } from 'react';

const CategoryFilterIsland = ({ categories, allPosts }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [filteredPosts, setFilteredPosts] = useState(allPosts);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);

        if (category === 'all') {
            setFilteredPosts(allPosts);
        } else {
            const filtered = allPosts.filter((post) => post.category === category);
            setFilteredPosts(filtered);
        }
    };

    return (    
        <div className="flex justify-end gap-4">
            {categories.map((category) => (
                <button key={category} onClick={() => handleCategoryClick(category)} className={`${activeCategory === category ? 'bg-sky-500 text-white' : 'bg-gray-800 text-gray-100'} px-4 py-2 rounded-md`}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilterIsland;

