import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreVertical } from 'lucide-react';

// Dummy data for posts
const initialPosts = [
  {
    id: 1,
    username: 'Cristiano',
    userAvatar: 'https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg',
    image: 'https://images2.minutemediacdn.com/image/upload/c_crop,w_5204,h_2927,x_0,y_0/c_fill,w_912,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/si/01j6a6q2cpj8edb2yk4x.jpg',
    likes: 580,
    caption: 'Another battle won. Let’s go',
    comments: [
      { id: 1, username: 'jane_smith', text: 'Looks amazing!' },
      { id: 2, username: 'tech_guy', text: 'Great shot!' }
    ],
    timestamp: '2 hours ago'
  },
  {
    id: 1,
    username: 'Virat',
    userAvatar: 'https://english.cdn.zeenews.com/sites/default/files/2024/10/05/1535993-untitled-design-32.jpg',
    image: 'https://c.ndtvimg.com/2025-03/bkdjub68_virat-kohli-bcci_625x300_23_March_25.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605',
    likes: 342,
    caption: 'Job well done in Hyderabad',
    comments: [
      { id: 1, username: 'jane_smith', text: 'Looks amazing!' },
      { id: 2, username: 'tech_guy', text: 'Great shot!' }
    ],
    timestamp: '2 hours ago'
  },
 
  {
    id: 1,
    username: 'john_doe',
    userAvatar: 'https://picsum.photos/seed/1/40/40',
    image: 'https://picsum.photos/seed/post1/600/400',
    likes: 342,
    caption: 'Beautiful day exploring the city! 🌆 #travel #adventure',
    comments: [
      { id: 1, username: 'jane_smith', text: 'Looks amazing!' },
      { id: 2, username: 'tech_guy', text: 'Great shot!' }
    ],
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    username: 'creative_soul',
    userAvatar: 'https://picsum.photos/seed/2/40/40',
    image: 'https://picsum.photos/seed/post2/600/400',
    likes: 789,
    caption: 'Sunset vibes 🌅 Capturing moments that matter.',
    comments: [
      { id: 1, username: 'wanderlust', text: 'Incredible view!' }
    ],
    timestamp: '5 hours ago'
  }
];

// Post Component
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg mb-4 max-w-md mx-auto">
      {/* Post Header */}
      <div className="flex items-center p-3">
        <img 
          src={post.userAvatar} 
          alt={`${post.username}'s avatar`} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div className="flex-grow">
          <h3 className="font-semibold text-white">{post.username}</h3>
        </div>
        <button className="text-gray-400">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Post Image */}
      <img 
        src={post.image} 
        alt="Post" 
        className="w-full object-cover"
      />

      {/* Post Actions */}
      <div className="p-3">
        <div className="flex items-center space-x-4 mb-2">
          <button 
            onClick={handleLike} 
            className={`${liked ? 'text-red-500' : 'text-gray-400'}`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button className="text-gray-400">
            <MessageCircle size={24} />
          </button>
          <button className="text-gray-400">
            <Send size={24} />
          </button>
          <button className="ml-auto text-gray-400">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-white">{likes} likes</p>

        {/* Caption */}
        <p className="mt-1 text-gray-300">
          <span className="font-semibold mr-2 text-white">{post.username}</span>
          {showFullCaption 
            ? post.caption 
            : post.caption.length > 50 
              ? `${post.caption.slice(0, 50)}... ` 
              : post.caption}
          {post.caption.length > 50 && (
            <button 
              onClick={toggleCaption} 
              className="text-gray-500 ml-1"
            >
              {showFullCaption ? 'Show less' : 'Show more'}
            </button>
          )}
        </p>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="mt-2 text-gray-400">
            <p>View all {post.comments.length} comments</p>
            {post.comments.slice(0, 2).map(comment => (
              <div key={comment.id} className="flex space-x-2">
                <span className="font-semibold text-white">{comment.username}</span>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 mt-2">{post.timestamp}</p>
      </div>
    </div>
  );
};

// Feeds Page Component
const FeedsPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="bg-gray-800 min-h-screen pt-16">
      {/* Create Post Button */}
      <div className="max-w-md mx-auto mb-4">
        <button 
          onClick={() => setIsCreatePostOpen(true)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create New Post
        </button>
      </div>

      {/* Posts */}
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FeedsPage;