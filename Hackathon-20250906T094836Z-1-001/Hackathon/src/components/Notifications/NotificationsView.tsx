import React, { useState } from 'react';
import { User, Notification } from '../../types';
import { 
  Bell, 
  Check, 
  X, 
  Filter, 
  CheckSquare, 
  FolderOpen, 
  MessageCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface NotificationsViewProps {
  currentUser: User;
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (notificationId: string) => void;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({
  currentUser,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}) => {
  const [filter, setFilter] = useState('all');

  const userNotifications = notifications.filter(n => n.userId === currentUser.id);
  
  const filteredNotifications = userNotifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_assigned':
      case 'task_completed':
        return CheckSquare;
      case 'project_update':
        return FolderOpen;
      case 'discussion':
        return MessageCircle;
      case 'deadline_reminder':
        return Clock;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, read: boolean) => {
    const baseColors = {
      task_assigned: 'blue',
      task_completed: 'green',
      project_update: 'purple',
      discussion: 'yellow',
      deadline_reminder: 'red'
    };
    
    const color = baseColors[type as keyof typeof baseColors] || 'gray';
    const opacity = read ? '100' : '500';
    
    return {
      bg: `bg-${color}-50`,
      border: `border-${color}-200`,
      text: `text-${color}-${opacity}`,
      icon: `text-${color}-${read ? '400' : '600'}`
    };
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return time.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your latest activities</p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Mark all as read</span>
            </button>
          )}
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {unreadCount} unread
            </span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All ({userNotifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'unread' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  filter === 'read' 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Read ({userNotifications.length - unreadCount})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 'No notifications yet'}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'You\'ll see notifications here when there are updates on your tasks and projects'
                : `Switch to ${filter === 'unread' ? 'read' : 'unread'} notifications to see more`
              }
            </p>
          </div>
        ) : (
          filteredNotifications
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map(notification => {
              const Icon = getNotificationIcon(notification.type);
              const colors = getNotificationColor(notification.type, notification.read);
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white border rounded-lg p-4 transition-all hover:shadow-md ${
                    !notification.read 
                      ? 'border-blue-200 shadow-sm' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 text-sm ${
                            !notification.read ? 'text-gray-700' : 'text-gray-500'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => onMarkAsRead(notification.id)}
                              className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onDeleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center text-xs text-blue-600">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                            <span>New</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>

      {/* Quick Stats */}
      {userNotifications.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {userNotifications.filter(n => n.type === 'task_assigned').length}
              </p>
              <p className="text-sm text-gray-600">Task Assignments</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {userNotifications.filter(n => n.type === 'task_completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed Tasks</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {userNotifications.filter(n => n.type === 'project_update').length}
              </p>
              <p className="text-sm text-gray-600">Project Updates</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {userNotifications.filter(n => n.type === 'deadline_reminder').length}
              </p>
              <p className="text-sm text-gray-600">Deadline Reminders</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsView;