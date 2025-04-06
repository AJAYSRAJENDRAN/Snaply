import React from 'react';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      name: 'John Doe',
      username: '@johndoe',
      avatar: 'https://picsum.photos/seed/1/40/40',
      mutualFriends: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: '@janesmith',
      avatar: 'https://picsum.photos/seed/2/40/40',
      mutualFriends: 3
    },
    {
      id: 3,
      name: 'Mike Johnson',
      username: '@mikejohnson',
      avatar: 'https://picsum.photos/seed/3/40/40',
      mutualFriends: 7
    }
  ]);

  const handleAddFriend = (userId) => {
    // TODO: Implement actual friend request logic
    setSuggestions(suggestions.filter(user => user.id !== userId));
  };

  return (
    <div className='bg-gray-800 text-white p-4 rounded-lg mt-36'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Suggestions</h2>
        <span className='text-sm text-gray-400'>See All</span>
      </div>

      {suggestions.map(user => (
        <div 
          key={user.id} 
          className='flex items-center justify-between mb-4'
        >
          <div className='flex items-center'>
            <img 
              src={user.avatar} 
              alt={user.name} 
              className='w-10 h-10 rounded-full mr-4'
            />
            <div>
              <div className='font-semibold'>{user.name}</div>
              <div className='text-sm text-gray-400'>
                {user.mutualFriends} mutual friends
              </div>
            </div>
          </div>
          <button 
            onClick={() => handleAddFriend(user.id)}
            className='bg-blue-600 text-white px-3 py-1 rounded-full flex items-center'
          >
            <UserPlus size={16} className='mr-1' /> Add
          </button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;