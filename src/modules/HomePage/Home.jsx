import React, { useState, useEffect } from 'react';
import Feeds from '../../components/Feeds';
import FriendList from '../../components/FriendList';
import Suggestions from '../../components/Suggestions';
 
function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className='w-full p-4'>
        <Feeds />
      </div>
    );
  }

  return (
    <div className='flex gap-4 h-screen overflow-hidden'>
      <div className='w-1/4 h-full p-2 '>
        <FriendList />
      </div>
      
      <div className='w-1/2 h-full overflow-y-auto no-scrollbar p-2'>
        <Feeds />
      </div>
      
      <div className='w-1/4 h-full p-2 '>
        <Suggestions />
      </div>
    </div>
  );
}

export default Home;