import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

const FriendsPage: React.FC = () => {
  // Sample friends data
  const friendsSuggestions = [
    {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 5
    },
    {
      id: '2',
      name: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 3
    },
    {
      id: '3',
      name: 'Marcus Williams',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 2
    },
    {
      id: '4',
      name: 'Olivia Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      mutualFriends: 7
    }
  ];
  
  const currentFriends = [
    {
      id: '5',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      lastActive: 'Active now'
    },
    {
      id: '6',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      lastActive: 'Active 5m ago'
    },
    {
      id: '7',
      name: 'James Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      lastActive: 'Active 1h ago'
    },
    {
      id: '8',
      name: 'Ava Thompson',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      lastActive: 'Active yesterday'
    }
  ];

  return (
    <div className="friends-container">
      <div className="friends-header">
        <h1>Friends</h1>
        <div className="friends-search">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search friends" />
        </div>
      </div>
      
      <div className="friends-section">
        <h2>People You May Know</h2>
        <div className="friends-grid">
          {friendsSuggestions.map((friend) => (
            <div className="friend-card" key={friend.id}>
              <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
              <div className="friend-info">
                <h3>{friend.name}</h3>
                <p>{friend.mutualFriends} mutual friends</p>
              </div>
              <button className="add-friend-button">
                <FontAwesomeIcon icon={faUserPlus} />
                <span>Add Friend</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="friends-section">
        <h2>Your Friends</h2>
        <div className="friends-grid">
          {currentFriends.map((friend) => (
            <div className="friend-card" key={friend.id}>
              <div className="friend-avatar-container">
                <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
                <div className="friend-status"></div>
              </div>
              <div className="friend-info">
                <h3>{friend.name}</h3>
                <p className="friend-active">{friend.lastActive}</p>
              </div>
              <button className="message-friend-button">Message</button>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .friends-container {
          max-width: 940px;
          margin: 80px auto 20px;
          padding: 0 15px;
        }
        
        .friends-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .friends-header h1 {
          font-size: 24px;
          font-weight: 700;
        }
        
        .friends-search {
          position: relative;
          width: 300px;
        }
        
        .friends-search input {
          width: 100%;
          padding: 10px 15px;
          padding-left: 40px;
          border: 1px solid #dddfe2;
          border-radius: 20px;
          background-color: #f0f2f5;
          font-size: 14px;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #606770;
        }
        
        .friends-section {
          margin-bottom: 30px;
        }
        
        .friends-section h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        
        .friends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
        }
        
        .friend-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .friend-avatar-container {
          position: relative;
          margin-bottom: 10px;
        }
        
        .friend-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 10px;
        }
        
        .friend-status {
          width: 12px;
          height: 12px;
          background-color: #31a24c;
          border-radius: 50%;
          border: 2px solid white;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
        
        .friend-info {
          margin-bottom: 15px;
        }
        
        .friend-info h3 {
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .friend-info p {
          color: #65676b;
          font-size: 14px;
        }
        
        .friend-active {
          color: #31a24c !important;
        }
        
        .add-friend-button, .message-friend-button {
          width: 100%;
          padding: 8px 0;
          background-color: #1877f2;
          color: white;
          border-radius: 5px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .message-friend-button {
          background-color: #e4e6eb;
          color: #050505;
        }
        
        @media (max-width: 768px) {
          .friends-container {
            margin-top: 70px;
          }
          
          .friends-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .friends-search {
            width: 100%;
          }
          
          .friends-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsPage;