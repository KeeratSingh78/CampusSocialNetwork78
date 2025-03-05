import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUserFriends, 
  faCalendarAlt, 
  faComments, 
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-profile">
        <img 
          src={user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"} 
          alt="Profile" 
        />
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-name">{user?.displayName}</div>
          <div className="sidebar-profile-view">View your profile</div>
        </div>
      </div>
      
      <div className="sidebar-divider"></div>
      
      <Link to="/" className={`sidebar-item ${isActive('/') ? 'active' : ''}`}>
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faHome} />
        </div>
        <span>Home</span>
      </Link>
      
      <Link to="/friends" className={`sidebar-item ${isActive('/friends') ? 'active' : ''}`}>
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faUserFriends} />
        </div>
        <span>Friends</span>
      </Link>
      
      <Link to="/events" className={`sidebar-item ${isActive('/events') ? 'active' : ''}`}>
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
        <span>Events</span>
      </Link>
      
      <Link to="/chat" className={`sidebar-item ${isActive('/chat') ? 'active' : ''}`}>
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faComments} />
        </div>
        <span>Chat</span>
      </Link>
      
      <Link to="/profile" className={`sidebar-item ${isActive('/profile') ? 'active' : ''}`}>
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span>Profile</span>
      </Link>
      
      <div className="sidebar-divider"></div>
      
      <div className="sidebar-header">Your Shortcuts</div>
      
      <div className="sidebar-item">
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>
        <span>Campus Events</span>
      </div>
      
      <div className="sidebar-item">
        <div className="sidebar-item-icon">
          <FontAwesomeIcon icon={faUserFriends} />
        </div>
        <span>Study Groups</span>
      </div>
    </div>
  );
};

export default Sidebar;