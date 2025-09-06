import React, { useState } from 'react';
import { User } from '../../types';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  User as UserIcon,
  Filter,
  Search
} from 'lucide-react';

interface SWOTViewProps {
  currentUser: User;
  users: User[];
}

const SWOTView: React.FC<SWOTViewProps> = ({ currentUser, users }) => {
  const [selectedUserId, setSelectedUserId] = useState(
    currentUser.role === 'admin' ? users[0]?.id || '' : currentUser.id
  );
  const [searchTerm, setSearchTerm] = useState('');

  const selectedUser = users.find(u => u.id === selectedUserId) || currentUser;
  const availableUsers = currentUser.role === 'admin' 
    ? users.filter(u => !u.banned)
    : [currentUser];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SWOTSection = ({ 
    title, 
    items, 
    color, 
    bgColor, 
    icon: Icon 
  }: { 
    title: string; 
    items: string[]; 
    color: string; 
    bgColor: string; 
    icon: any;
  }) => (
    <div className={`${bgColor} border border-gray-200 rounded-lg p-6 h-full`}>
      <div className="flex items-center space-x-2 mb-4">
        <div className={`p-2 ${color.replace('text-', 'bg-').replace('-600', '-100')} rounded-lg`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <h3 className={`font-semibold ${color} text-lg`}>{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')} mt-2 flex-shrink-0`}></div>
            <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className="text-gray-500 text-sm italic">No items identified yet</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SWOT Analysis</h1>
          <p className="text-gray-600">
            Strengths, Weaknesses, Opportunities, and Threats assessment
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Target className="w-4 h-4" />
          <span>Strategic Performance Review</span>
        </div>
      </div>

      {/* User Selection */}
      {currentUser.role === 'admin' && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {filteredUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} - {user.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Selected User Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h2>
            <p className="text-gray-600">{selectedUser.title} • {selectedUser.department}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Joined: {new Date(selectedUser.joinDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>Performance: {selectedUser.performance.successRate}% Success Rate</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UserIcon className="w-4 h-4" />
              <span className="capitalize">{selectedUser.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SWOT Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SWOTSection
          title="Strengths"
          items={selectedUser.swot.strengths}
          color="text-green-600"
          bgColor="bg-green-50"
          icon={Shield}
        />
        
        <SWOTSection
          title="Weaknesses"
          items={selectedUser.swot.weaknesses}
          color="text-red-600"
          bgColor="bg-red-50"
          icon={AlertTriangle}
        />
        
        <SWOTSection
          title="Opportunities"
          items={selectedUser.swot.opportunities}
          color="text-blue-600"
          bgColor="bg-blue-50"
          icon={TrendingUp}
        />
        
        <SWOTSection
          title="Threats"
          items={selectedUser.swot.threats}
          color="text-orange-600"
          bgColor="bg-orange-50"
          icon={AlertTriangle}
        />
      </div>

      {/* Analysis Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Assessment Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-green-50 rounded-lg w-fit mx-auto mb-2">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{selectedUser.swot.strengths.length}</p>
            <p className="text-sm text-gray-600">Core Strengths</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-red-50 rounded-lg w-fit mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{selectedUser.swot.weaknesses.length}</p>
            <p className="text-sm text-gray-600">Areas to Improve</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg w-fit mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{selectedUser.swot.opportunities.length}</p>
            <p className="text-sm text-gray-600">Growth Opportunities</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-orange-50 rounded-lg w-fit mx-auto mb-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{selectedUser.swot.threats.length}</p>
            <p className="text-sm text-gray-600">Risk Factors</p>
          </div>
        </div>
      </div>

      {/* Performance Integration */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{selectedUser.performance.tasksCompleted}</p>
            <p className="text-sm text-gray-600">Tasks Completed</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{selectedUser.performance.tasksInProgress}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{selectedUser.performance.averageCompletionTime}d</p>
            <p className="text-sm text-gray-600">Avg. Completion Time</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{selectedUser.performance.successRate}%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Skills & Competencies</h3>
        <div className="flex flex-wrap gap-2">
          {selectedUser.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        {selectedUser.skills.length === 0 && (
          <p className="text-gray-500 text-sm italic">No skills listed</p>
        )}
      </div>
    </div>
  );
};

export default SWOTView;