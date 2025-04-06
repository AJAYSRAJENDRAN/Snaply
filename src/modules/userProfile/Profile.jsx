import React, { useState } from 'react';
import { Grid, List, Heart, MessageCircle } from 'lucide-react';

// Updated dummy post data with proper image URLs
const dummyPosts = [
  { 
    id: 1, 
    image: 'https://assets.goal.com/images/v3/blt2aaca933046f8b00/Cristiano%20Ronaldo%20Portugal%202024%20(4).jpg', 
    likes: 342, 
    comments: 45 
  },
  { 
    id: 1, 
    image: 'https://e00-mx-marca.uecdn.es/mx/assets/multimedia/imagenes/2025/03/30/17432895157944.jpg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://ichef.bbci.co.uk/ace/standard/2560/cpsprodpb/7bcb/live/0154c130-e3a7-11ef-8450-ff58a15d40df.jpg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-al-nassr-looks-on-as-he-lines-up-prior-news-photo-1707422901.jpg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://media.npr.org/assets/img/2022/12/30/ap22364795346345-153c53713ce57b880428deae9fef9b9926961b6b.jpg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w960/f_auto/primary/ix5rdbcfnwifaf3oeozv', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://assets.goal.com/images/v3/bltf07fc898a2bf9ba7/GettyImages-1247954164.jpg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://media.npr.org/assets/img/2022/11/22/ap22298283107973-6354e787f659b3a2ef173e743b1637819270f59a.jpg?s=1100&c=50&f=jpeg', 
    likes: 342, 
    comments: 45 
  }, { 
    id: 1, 
    image: 'https://people.com/thmb/HWGnlqgfmw-AoYFo7ieP3uXKHU8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(599x209:601x211)/christiano-ronaldo-2-9af96f2d100549c68378dabd3915134a.jpg', 
    likes: 342, 
    comments: 45 
  },
];

function Profile() {
  const [activeView, setActiveView] = useState('grid');
  const [posts, setPosts] = useState(dummyPosts);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  const handleImageError = (postId) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [postId]: true
    }));
  };

  const renderPostGrid = () => {
    return (
      <div className="grid grid-cols-3 gap-1 md:gap-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="relative aspect-square overflow-hidden group cursor-pointer"
          >
            {imageLoadErrors[post.id] ? (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Image Not Found</span>
              </div>
            ) : (
              <img 
                src={post.image} 
                alt={`Post ${post.id}`} 
                onError={() => handleImageError(post.id)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center space-x-4 text-white transition-all duration-300">
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                <Heart size={20} fill="white" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                <MessageCircle size={20} fill="white" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPostList = () => {
    return (
      <div className="space-y-4">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="flex items-center bg-gray-800 shadow-md rounded-lg p-4"
          >
            {imageLoadErrors[post.id] ? (
              <div className="w-24 h-24 bg-gray-700 flex items-center justify-center mr-4 rounded-lg">
                <span className="text-gray-500">Image Not Found</span>
              </div>
            ) : (
              <img 
                src={post.image} 
                alt={`Post ${post.id}`} 
                onError={() => handleImageError(post.id)}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
            )}
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">Post {post.id}</h3>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Heart size={20} className="text-gray-400" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle size={20} className="text-gray-400" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mt-2">Description for post {post.id}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-16 container mx-auto px-4 bg-gray-900 min-h-screen text-white">
      {/* Profile Header */}
      <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src="https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg" 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Cristiano Ronaldo</h1>
            <p className="text-gray-400">@cristiano</p>
            <p className="text-sm text-gray-500 mt-2">
              Footballer 
            </p>
          </div>
        </div>
        
        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <h3 className="font-bold text-xl text-white">42</h3>
            <p className="text-gray-400">Posts</p>
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">600M</h3>
            <p className="text-gray-400">Followers</p>
          </div>
          <div>
            <h3 className="font-bold text-xl text-white">500</h3>
            <p className="text-gray-400">Following</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center space-x-4 border-t border-gray-700 pt-4">
          {/* <button
            onClick={() => setActiveView('grid')}
            className={`flex items-center space-x-2 ${
              activeView === 'grid' ? 'text-blue-400' : 'text-gray-500'
            }`}
          >
            <Grid size={24} />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`flex items-center space-x-2 ${
              activeView === 'list' ? 'text-blue-400' : 'text-gray-500'
            }`}
          >
            <List size={24} />
            <span>List</span>
          </button> */}
        </div>
      </div>

      {/* Posts */}
      <div className="bg-gray-900 rounded-lg p-4">
        {activeView === 'grid' ? renderPostGrid() : renderPostList()}
      </div>
    </div>
  );
}

export default Profile;