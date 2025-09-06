import React from 'react';
import {
  Home,
  FolderOpen,
  CheckSquare,
  Users,
  MessageCircle,
  BarChart3,
  Target,
  Settings,
  Bell,
} from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  currentUser: User;
  activeView: string;
  onViewChange: (view: string) => void;
  notificationCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeView,
  onViewChange,
  notificationCount,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    ...(currentUser.role === 'admin'
      ? [{ id: 'users', label: 'Users', icon: Users }]
      : []),
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'swot', label: 'SWOT Analysis', icon: Target },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">SynergySphere</h1>
        <p className="text-sm text-gray-600 mt-1">Team Collaboration</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeView === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => onViewChange('notifications')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            activeView === 'notifications'
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          <Bell className="w-5 h-5 mr-3" />
          <span className="font-medium">Notifications</span>
          {notificationCount > 0 && (
            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* <button
          onClick={() => onViewChange('settings')}
          className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 mt-2 ${
            activeView === 'settings'
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span className="font-medium">Settings</span>
        </button> */}
      </div>
    </aside>
  );
};

export default Sidebar;
