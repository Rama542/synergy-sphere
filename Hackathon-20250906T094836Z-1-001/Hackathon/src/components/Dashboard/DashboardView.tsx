import React from 'react';
import { User, Project, Task } from '../../types';
import { 
  Users, 
  FolderOpen, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  Award
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: User;
  users: User[];
  projects: Project[];
  tasks: Task[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ 
  currentUser, 
  users, 
  projects, 
  tasks 
}) => {
  const userTasks = currentUser.role === 'admin' 
    ? tasks 
    : tasks.filter(task => task.assigneeId === currentUser.id);

  const userProjects = currentUser.role === 'admin'
    ? projects
    : projects.filter(project => project.teamMembers.includes(currentUser.id));

  const completedTasks = userTasks.filter(task => task.status === 'done').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = userTasks.filter(task => task.status === 'todo').length;
  const overdueTasks = userTasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'done'
  ).length;

  const activeProjects = userProjects.filter(project => project.status === 'active').length;
  const avgProjectProgress = userProjects.reduce((sum, project) => sum + project.progress, 0) / userProjects.length || 0;

  const recentTasks = userTasks
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const upcomingDeadlines = userTasks
    .filter(task => task.status !== 'done')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'todo': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your work and team performance</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{activeProjects}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{avgProjectProgress.toFixed(1)}%</span>
            <span className="text-gray-600 ml-1">avg progress</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{userTasks.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Award className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">{completedTasks}</span>
            <span className="text-gray-600 ml-1">completed</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-gray-600">{todoTasks} pending</span>
          </div>
        </div>

        {currentUser.role === 'admin' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">{users.filter(u => !u.banned).length}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Users className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-purple-600 font-medium">{users.filter(u => u.role === 'admin').length}</span>
              <span className="text-gray-600 ml-1">admin(s)</span>
            </div>
          </div>
        )}

        {overdueTasks > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Overdue Tasks</p>
                <p className="text-2xl font-bold text-red-700">{overdueTasks}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-red-600">
              Requires immediate attention
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <p className="text-sm text-gray-600">Latest task updates</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTasks.map(task => {
                const project = projects.find(p => p.id === task.projectId);
                const assignee = users.find(u => u.id === task.assigneeId);
                return (
                  <div key={task.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{project?.name}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                      {assignee && (
                        <img 
                          src={assignee.avatar} 
                          alt={assignee.name}
                          className="w-6 h-6 rounded-full mt-1 ml-auto"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
              {recentTasks.length === 0 && (
                <p className="text-center text-gray-500 py-8">No recent tasks</p>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            <p className="text-sm text-gray-600">Tasks due soon</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines.map(task => {
                const project = projects.find(p => p.id === task.projectId);
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isOverdue = daysUntilDue < 0;
                const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;
                
                return (
                  <div key={task.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{project?.name}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${
                        isOverdue ? 'text-red-600' : isDueSoon ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {isOverdue 
                          ? `${Math.abs(daysUntilDue)} days overdue`
                          : daysUntilDue === 0 
                          ? 'Due today'
                          : `${daysUntilDue} days left`
                        }
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {dueDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              {upcomingDeadlines.length === 0 && (
                <p className="text-center text-gray-500 py-8">No upcoming deadlines</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;