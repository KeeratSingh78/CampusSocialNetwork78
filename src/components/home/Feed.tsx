import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, 
  faVideo, 
  faSmile, 
  faThumbsUp, 
  faComment, 
  faShare, 
  faEllipsisH 
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Feed: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts } = useSelector((state: RootState) => state.posts);

  // Sample posts data for demonstration
  const samplePosts = [
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'Just finished my final project for Computer Science! 🎉 So relieved it\'s over. Anyone else done with finals?',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      likes: 24,
      comments: 5,
      shares: 2,
      createdAt: Date.now() - 3600000,
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Chen',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'Campus Connect study group meeting tomorrow at the library, 3rd floor, 5 PM. We\'ll be covering calculus and physics. Everyone is welcome!',
      likes: 15,
      comments: 8,
      shares: 3,
      createdAt: Date.now() - 7200000,
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80',
      content: 'Check out the new student center! They\'ve added so many cool features.',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      likes: 42,
      comments: 12,
      shares: 5,
      createdAt: Date.now() - 86400000,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : samplePosts;

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) {
      return 'Just now';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)} min ago`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)} hr ago`;
    } else {
      return `${Math.floor(diff / 86400000)} days ago`;
    }
  };

  return (
    <div className="feed-container">
      <div className="create-post">
        <div className="create-post-header">
          <img 
            src={user?.photoURL || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"} 
            alt="Profile" 
          />
          <div className="create-post-input">What's on your mind?</div>
        </div>
        <div className="create-post-actions">
          <div className="post-action photo">
            <FontAwesomeIcon icon={faImage} />
            <span>Photo</span>
          </div>
          <div className="post-action video">
            <FontAwesomeIcon icon={faVideo} />
            <span>Video</span>
          </div>
          <div className="post-action">
            <FontAwesomeIcon icon={faSmile} />
            <span>Feeling</span>
          </div>
        </div>
      </div>
      
      {displayPosts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-header">
            <img src={post.userAvatar} alt="Avatar" className="post-avatar" />
            <div className="post-user-info">
              <div className="post-username">{post.userName}</div>
              <div className="post-time">{formatTime(post.createdAt)}</div>
            </div>
            <div className="post-more">
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
          
          <div className="post-content">{post.content}</div>
          
          {post.imageUrl && (
            <img src={post.imageUrl} alt="Post" className="post-image" />
          )}
          
          {post.videoUrl && (
            <video src={post.videoUrl} controls className="post-video"></video>
          )}
          
          <div className="post-stats">
            <div className="post-likes">
              <FontAwesomeIcon icon={faThumbsUp} color="#1877f2" />
              <span>{post.likes}</span>
            </div>
            <div className="post-comments-shares">
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
          
          <div className="post-actions">
            <div className="post-action-button">
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>Like</span>
            </div>
            <div className="post-action-button">
              <FontAwesomeIcon icon={faComment} />
              <span>Comment</span>
            </div>
            <div className="post-action-button">
              <FontAwesomeIcon icon={faShare} />
              <span>Share</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;