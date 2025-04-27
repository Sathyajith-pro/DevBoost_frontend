import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../Components/SideBar/SideBar';
import { RiDeleteBin6Fill, RiNotificationLine } from "react-icons/ri";
import { FiCheckCircle } from "react-icons/fi";
import './notification.css';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8080/notifications/${id}/markAsRead`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="notification-page">
      <SideBar />
      
      <div className="notification-content">
        <div className="notification-header">
          <h1>Notifications</h1>
        </div>
        
        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <RiNotificationLine className="empty-icon" size={48} />
              <p className="empty-message">No notifications to display</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-card ${notification.read ? '' : 'unread'}`}
              >
                <p className="notification-message">{notification.message}</p>
                
                <div className="notification-meta">
                  <span className="notification-time">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                  
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <FiCheckCircle /> Mark as Read
                      </button>
                    )}
                    <button 
                      className="btn-icon"
                      onClick={() => handleDelete(notification.id)}
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;