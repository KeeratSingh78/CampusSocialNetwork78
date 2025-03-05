import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faSearch, 
  faBell, 
  faEnvelope, 
  faBars,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { auth } from '../../../../backend/firebase/config';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FontAwesomeIcon icon={faGraduationCap} />
          <Link to="/">Campus Connect</Link>
        </div>
        
        <div className="navbar-search">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input type="text" placeholder="Search Campus Connect" />
        </div>
        
        <div className="navbar-actions">
          <div className="navbar-icon">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="navbar-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          
          <div className="navbar-profile" onClick={() => setShowDropdown(!showDropdown)}>
            <img 
              src={user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"} 
              alt="Profile" 
            />
            <span>{user?.displayName}</span>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Profile</span>
                </Link>
                <div className="dropdown-item" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
          
          <button className="mobile-menu-button" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;