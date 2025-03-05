import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus, 
  faComment, 
  faEllipsisH, 
  faGraduationCap, 
  faMapMarkerAlt, 
  faBriefcase, 
  faHeart, 
  faGlobe 
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = useState('posts');
  
  // Sample user data for demonstration
  const userData = {
    name: user?.displayName || 'John Doe',
    avatar: user?.photoURL || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
    bio: 'Computer Science student | Web Developer | Coffee Enthusiast',
    friends: 245,
    photos: 87,
    videos: 12,
    school: 'University of Technology',
    location: 'San Francisco, CA',
    work: 'Student Developer at Tech Labs',
    relationship: 'Single',
    website: 'johndoe.dev'
  };

  return (
    <div className="profile-container">
      <div className="profile-cover"></div>
      
      <img 
        src={userData.avatar} 
        alt="Profile" 
        className="profile-avatar" 
      />
      
      <div className="profile-info">
        <h1 className="profile-name">{userData.name}</h1>
        <p className="profile-bio">{userData.bio}</p>
        
        <div className="profile-stats">
          <div className="profile-stat">
            <div className="profile-stat-number">{userData.friends}</div>
            <div className="profile-stat-label">Friends</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-number">{userData.photos}</div>
            <div className="profile-stat-label">Photos</div>
          </div>
          <div className="profile-stat">
            <div className="profile-stat-number">{userData.videos}</div>
            <div className="profile-stat-label">Videos</div>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="profile-action-button profile-action-primary">
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Add Friend</span>
          </button>
          <button className="profile-action-button profile-action-primary">
            <FontAwesomeIcon icon={faComment} />
            <span>Message</span>
          </button>
          <button className="profile-action-button profile-action-secondary">
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </div>
      </div>
      
      <div className="profile-tabs">
        <div 
          className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </div>
        <div 
          className={`profile-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </div>
        <div 
          className={`profile-tab ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </div>
        <div 
          className={`profile-tab ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </div>
      </div>
      
      <div className="profile-content">
        {activeTab === 'about' && (
          <div className="profile-about">
            <h2 className="profile-about-title">About</h2>
            
            <div className="profile-about-item">
              <div className="profile-about-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div className="profile-about-text">
                Studied at <strong>{userData.school}</strong>
              </div>
            </div>
            
            <div className="profile-about-item">
              <div className="profile-about-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="profile-about-text">
                Lives in <strong>{userData.location}</strong>
              </div>
            </div>
            
            <div className="profile-about-item">
              <div className="profile-about-icon">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <div className="profile-about-text">
                Works at <strong>{userData.work}</strong>
              </div>
            </div>
            
            <div className="profile-about-item">
              <div className="profile-about-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="profile-about-text">
                <strong>{userData.relationship}</strong>
              </div>
            </div>
            
            <div className="profile-about-item">
              <div className="profile-about-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <div className="profile-about-text">
                <strong>{userData.website}</strong>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'posts' && (
          <div className="profile-posts">
            {/* We'll reuse the Feed component's post structure here */}
            <div className="create-post">
              <div className="create-post-header">
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                />
                <div className="create-post-input">What's on your mind?</div>
              </div>
              <div className="create-post-actions">
                <div className="post-action photo">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Photo</span>
                </div>
                <div className="post-action video">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Video</span>
                </div>
                <div className="post-action">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Feeling</span>
                </div>
              </div>
            </div>
            
            {/* Sample post */}
            <div className="post-card">
              <div className="post-header">
                <img src={userData.avatar} alt="Avatar" className="post-avatar" />
                <div className="post-user-info">
                  <div className="post-username">{userData.name}</div>
                  <div className="post-time">2 days ago</div>
                </div>
                <div className="post-more">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </div>
              </div>
              
              <div className="post-content">
                Just submitted my research paper on AI applications in education. Excited to share the results soon!
              </div>
              
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Post" 
                className="post-image" 
              />
              
              <div className="post-stats">
                <div className="post-likes">
                  <FontAwesomeIcon icon={faGraduationCap} color="#1877f2" />
                  <span>32</span>
                </div>
                <div className="post-comments-shares">
                  <span>8 comments</span>
                  <span>3 shares</span>
                </div>
              </div>
              
              <div className="post-actions">
                <div className="post-action-button">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Like</span>
                </div>
                <div className="post-action-button">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Comment</span>
                </div>
                <div className="post-action-button">
                  <FontAwesomeIcon icon={faGraduationCap} />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;