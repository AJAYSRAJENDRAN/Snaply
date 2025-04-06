import React, { useState } from 'react';
import { UserPlus, Search, MoreVertical, X, Check, MessageCircle } from 'lucide-react';

function    FriendList() {
  const [activeTab, setActiveTab] = useState('all'); // all, online, pending, blocked
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      username: '@janesmith',
      avatar: 'https://picsum.photos/seed/1/40/40',
      status: 'online',
      mutualFriends: 12
    },
    {
      id: 2,
      name: 'Mike Johnson',
      username: '@mikejohnson',
      avatar: 'https://picsum.photos/seed/2/40/40',
      status: 'offline',
      mutualFriends: 5
    },
    {
      id: 3,
      name: 'Emily Wong',
      username: '@emilywong',
      avatar: 'https://picsum.photos/seed/3/40/40',
      status: 'away',
      mutualFriends: 8
    }
  ]);

  const [pendingFriends, setPendingFriends] = useState([
    {
      id: 4,
      name: 'Alex Rodriguez',
      username: '@alexrod',
      avatar: 'https://picsum.photos/seed/4/40/40',
      type: 'incoming'
    },
    {
      id: 5,
      name: 'Sarah Lee',
      username: '@sarahlee',
      avatar: 'https://picsum.photos/seed/5/40/40',
      type: 'outgoing'
    }
  ]);

  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: 6,
      name: 'Tom Baker',
      username: '@tombaker',
      avatar: 'https://picsum.photos/seed/6/40/40'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddFriend = () => {
    const newUsername = prompt('Enter username to add friend:');
    if (newUsername) {
      const newFriend = {
        id: Date.now(),
        name: newUsername.split('@')[1] || newUsername,
        username: newUsername.startsWith('@') ? newUsername : `@${newUsername}`,
        avatar: `https://picsum.photos/seed/${Date.now()}/40/40`,
        status: 'offline',
        mutualFriends: Math.floor(Math.random() * 20)
      };

      setPendingFriends([
        ...pendingFriends, 
        { ...newFriend, type: 'outgoing' }
      ]);
    }
  };

  const handleAcceptFriend = (friendId) => {
    const friendToAccept = pendingFriends.find(f => f.id === friendId);
    if (friendToAccept) {
      setFriends([
        ...friends, 
        { 
          ...friendToAccept, 
          status: 'offline', 
          mutualFriends: Math.floor(Math.random() * 20) 
        }
      ]);
      setPendingFriends(pendingFriends.filter(f => f.id !== friendId));
    }
  };

  const handleRejectFriend = (friendId) => {
    setPendingFriends(pendingFriends.filter(f => f.id !== friendId));
  };

  const handleBlockUser = (user) => {
    setFriends(friends.filter(f => f.id !== user.id));
    setPendingFriends(pendingFriends.filter(f => f.id !== user.id));
    
    if (!blockedUsers.some(b => b.id === user.id)) {
      setBlockedUsers([...blockedUsers, user]);
    }
  };

  const handleUnblockUser = (userId) => {
    setBlockedUsers(blockedUsers.filter(b => b.id !== userId));
  };

  const renderFriendList = () => {
    let displayList = [];

    switch(activeTab) {
      case 'all':
        displayList = friends;
        break;
      case 'online':
        displayList = friends.filter(f => f.status === 'online');
        break;
      case 'pending':
        displayList = pendingFriends;
        break;
      case 'blocked':
        displayList = blockedUsers;
        break;
      default:
        displayList = friends;
    }

    // Filter by search query
    displayList = displayList.filter(friend => 
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return displayList.map(friend => {
      if (activeTab === 'pending') {
        return (
          <div 
            key={friend.id} 
            className="flex items-center justify-between p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-white">{friend.name}</div>
                <div className="text-sm text-gray-400">{friend.username}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {friend.type === 'incoming' && (
                <>
                  <button 
                    onClick={() => handleAcceptFriend(friend.id)}
                    className="bg-green-600 text-white p-1 rounded-full"
                  >
                    <Check size={20} />
                  </button>
                  <button 
                    onClick={() => handleRejectFriend(friend.id)}
                    className="bg-red-600 text-white p-1 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </>
              )}
              {friend.type === 'outgoing' && (
                <div className="text-sm text-gray-400">Pending</div>
              )}
            </div>
          </div>
        );
      }

      if (activeTab === 'blocked') {
        return (
          <div 
            key={friend.id} 
            className="flex items-center justify-between p-4 border-b border-gray-700"
          >
            <div className="flex items-center">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-10 h-10 rounded-full mr-4 grayscale"
              />
              <div>
                <div className="font-semibold text-white">{friend.name}</div>
                <div className="text-sm text-gray-400">{friend.username}</div>
              </div>
            </div>
            <button 
              onClick={() => handleUnblockUser(friend.id)}
              className="text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded"
            >
              Unblock
            </button>
          </div>
        );
      }

      return (
        <div 
          key={friend.id} 
          className="flex items-center justify-between p-4 border-b border-gray-700"
        >
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className="w-10 h-10 rounded-full mr-4"
              />
              <span 
                className={`absolute bottom-0 right-3 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusColor(friend.status)}`}
              ></span>
            </div>
            <div>
              <div className="font-semibold text-white">{friend.name}</div>
              <div className="text-sm text-gray-400">
                {friend.username} • {friend.mutualFriends} mutual friends
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle 
              className="text-blue-500 cursor-pointer" 
              onClick={() => {
                // TODO: Implement chat navigation
                alert(`Start chat with ${friend.name}`);
              }}
            />
            <MoreVertical 
              className="text-gray-400 cursor-pointer"
              onClick={() => {
                const action = prompt(`Actions for ${friend.name}:\n1. Block\n2. Remove Friend`);
                if (action === '1') {
                  handleBlockUser(friend);
                } else if (action === '2') {
                  setFriends(friends.filter(f => f.id !== friend.id));
                }
              }}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bg-gray-800 max-h-full text-white border border-gray-700 mt-20 p-2">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-800">
          <h1 className="text-2xl font-bold">Friends</h1>
          <UserPlus 
            className="cursor-pointer text-blue-500" 
            onClick={handleAddFriend}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {['all', 'online', 'pending', 'blocked'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize ${
                activeTab === tab 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-gray-800 rounded-lg">
            <Search className="ml-3 text-gray-400" />
            <input 
              type="text"
              placeholder="Search friends"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent p-2 text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Friend List */}
        <div>
          {renderFriendList().length > 0 ? (
            renderFriendList()
          ) : (
            <div className="text-center text-gray-400 p-4">
              No friends in this category
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FriendList;