import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faUsers, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Events: React.FC = () => {
  const { events } = useSelector((state: RootState) => state.events);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample events data for demonstration
  const sampleEvents = [
    {
      id: '1',
      title: 'Campus Tech Hackathon',
      description: 'Join us for a 24-hour coding challenge to build innovative solutions for campus problems.',
      date: '2025-05-15',
      location: 'Student Center, Room 302',
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      organizer: 'Tech Club',
      attendees: 45
    },
    {
      id: '2',
      title: 'Spring Music Festival',
      description: 'Annual spring music festival featuring student bands and professional artists.',
      date: '2025-04-20',
      location: 'Campus Quad',
      imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      organizer: 'Student Activities Board',
      attendees: 230
    },
    {
      id: '3',
      title: 'Career Fair: Tech & Engineering',
      description: 'Connect with top employers in the tech and engineering fields. Bring your resume!',
      date: '2025-03-10',
      location: 'Engineering Building, Main Hall',
      imageUrl: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      organizer: 'Career Services',
      attendees: 120
    },
    {
      id: '4',
      title: 'International Food Festival',
      description: 'Taste cuisines from around the world prepared by international student clubs.',
      date: '2025-04-05',
      location: 'Campus Dining Hall',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
      organizer: 'International Student Association',
      attendees: 180
    }
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h1 className="events-title">Campus Events</h1>
        <button className="create-event-button">
          <FontAwesomeIcon icon={faPlus} />
          <span>Create Event</span>
        </button>
      </div>
      
      <div className="events-filters">
        <div 
          className={`events-filter ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Events
        </div>
        <div 
          className={`events-filter ${activeFilter === 'today' ? 'active' : ''}`}
          onClick={() => setActiveFilter('today')}
        >
          Today
        </div>
        <div 
          className={`events-filter ${activeFilter === 'this-week' ? 'active' : ''}`}
          onClick={() => setActiveFilter('this-week')}
        >
          This Week
        </div>
        <div 
          className={`events-filter ${activeFilter === 'this-month' ? 'active' : ''}`}
          onClick={() => setActiveFilter('this-month')}
        >
          This Month
        </div>
        <div 
          className={`events-filter ${activeFilter === 'going' ? 'active' : ''}`}
          onClick={() => setActiveFilter('going')}
        >
          Going
        </div>
        <div 
          className={`events-filter ${activeFilter === 'interested' ? 'active' : ''}`}
          onClick={() => setActiveFilter('interested')}
        >
          Interested
        </div>
      </div>
      
      <div className="events-grid">
        {displayEvents.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            
            <div className="event-content">
              <div className="event-date">{formatDate(event.date)}</div>
              <h2 className="event-title">{event.title}</h2>
              
              <div className="event-details">
                <div className="event-detail">
                  <FontAwesomeIcon icon={faCalendarAlt} className="event-detail-icon" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="event-detail">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="event-detail-icon" />
                  <span>{event.location}</span>
                </div>
                <div className="event-detail">
                  <FontAwesomeIcon icon={faUsers} className="event-detail-icon" />
                  <span>Organized by {event.organizer}</span>
                </div>
              </div>
              
              <div className="event-attendees">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
                  alt="Attendee" 
                  className="event-attendee" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
                  alt="Attendee" 
                  className="event-attendee" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" 
                  alt="Attendee" 
                  className="event-attendee" 
                />
                <span className="event-attendees-count">+{event.attendees - 3} going</span>
              </div>
              
              <button className="event-rsvp">RSVP</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;