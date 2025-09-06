import React from 'react';
import { User, Task, Project } from '../../types';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  Award,
  Calendar,
  PieChart
} from 'lucide-react';

interface AnalyticsViewProps {
  currentUser: User;
  users: User[];
  tasks: Task[];
  projects: Project[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  currentUser,
  users,
  tasks,
  projects
}) => {
  const activeUsers = users.filter(u => !u.banned);
  const activeTasks = tasks.filter(t => t.status !== 'done');
  const completedTasks = tasks.filter(t => t.status === 'done');
  const activeProjects = projects.filter(p => p.status === 'active');

  // Team performance metrics
  const teamPerformance = activeUsers.map(user => {
    const userTasks = tasks.filter(t => t.assigneeId === user.id);
    const completedUserTasks = userTasks.filter(t => t.status === 'done');
    const inProgressTasks = userTasks.filter(t => t.status === 'in-progress');
    const overdueTasks = userTasks.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== 'done'
    );

    const totalTimeTracked = userTasks.reduce((sum, task) => sum + task.timeTracked, 0);
    const totalEstimatedTime = userTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const efficiency = totalEstimatedTime > 0 ? (totalTimeTracked / totalEstimatedTime) * 100 : 0;

    return {
      user,
      totalTasks: userTasks.length,
      completedTasks: completedUserTasks.length,
      inProgressTasks: inProgressTasks.length,
      overdueTasks: overdueTasks.length,
      completionRate: userTasks.length > 0 ? (completedUserTasks.length / userTasks.length) * 100 : 0,
      efficiency,
      timeTracked: totalTimeTracked,
      estimatedTime: totalEstimatedTime
    };
  });

  // Project analytics
  const projectAnalytics = projects.map(project => {
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const completedProjectTasks = projectTasks.filter(t => t.status === 'done');
    const overdueTasks = projectTasks.filter(t => 
      new Date(t.dueDate) < new Date() && t.status !== 'done'
    );

    return {
      project,
      totalTasks: projectTasks.length,
      completedTasks: completedProjectTasks.length,
      completionRate: projectTasks.length > 0 ? (completedProjectTasks.length / projectTasks.length) * 100 : 0,
      overdueTasks: overdueTasks.length,
      teamSize: project.teamMembers.length
    };
  });

  // Task distribution by status
  const taskStatusDistribution = [
    { status: 'To Do', count: tasks.filter(t => t.status === 'todo').length, color: 'bg-gray-500' },
    { status: 'In Progress', count: tasks.filter(t => t.status === 'in-progress').length, color: 'bg-blue-500' },
    { status: 'Completed', count: tasks.filter(t => t.status === 'done').length, color: 'bg-green-500' }
  ];

  // Task priority distribution
  const priorityDistribution = [
    { priority: 'High', count: tasks.filter(t => t.priority === 'high').length, color: 'bg-red-500' },
    { priority: 'Medium', count: tasks.filter(t => t.priority === 'medium').length, color: 'bg-yellow-500' },
    { priority: 'Low', count: tasks.filter(t => t.priority === 'low').length, color: 'bg-green-500' }
  ];

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp className={`w-4 h-4 mr-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(trend)}%
          </span>
          <span className="text-gray-600 ml-1">from last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & KPIs</h1>
          <p className="text-gray-600">Team performance and project insights</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Projects"
          value={projects.length}
          subtitle={`${activeProjects.length} active`}
          icon={BarChart3}
          trend={12}
          color="blue"
        />
        <MetricCard
          title="Total Tasks"
          value={tasks.length}
          subtitle={`${completedTasks.length} completed`}
          icon={Target}
          trend={8}
          color="green"
        />
        <MetricCard
          title="Team Members"
          value={activeUsers.length}
          subtitle={`${users.filter(u => u.role === 'admin').length} admin(s)`}
          icon={Users}
          trend={5}
          color="purple"
        />
        <MetricCard
          title="Completion Rate"
          value={`${tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%`}
          subtitle="Overall project success"
          icon={Award}
          trend={3}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h2>
          <div className="space-y-4">
            {taskStatusDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.status}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{
                        width: `${tasks.length > 0 ? (item.count / tasks.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {tasks.length > 0 ? Math.round((item.count / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Priority Distribution</h2>
          <div className="space-y-4">
            {priorityDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.priority} Priority</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-900 font-medium">{item.count}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{
                        width: `${tasks.length > 0 ? (item.count / tasks.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {tasks.length > 0 ? Math.round((item.count / tasks.length) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Team Performance</h2>
          <p className="text-sm text-gray-600">Individual member statistics and KPIs</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Tasks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  In Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamPerformance.map((member, index) => (
                <tr key={member.user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={member.user.avatar}
                        alt={member.user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {member.user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.user.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.totalTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                    {member.completedTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {member.inProgressTasks}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${member.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {Math.round(member.completionRate)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${
                      member.efficiency > 100 ? 'text-red-600' : 
                      member.efficiency > 80 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {Math.round(member.efficiency)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.overdueTasks > 0
                        ? 'bg-red-100 text-red-800'
                        : member.inProgressTasks > 0
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {member.overdueTasks > 0
                        ? 'Has Overdue'
                        : member.inProgressTasks > 0
                        ? 'Active'
                        : 'On Track'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Project Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Project Performance</h2>
          <p className="text-sm text-gray-600">Project completion rates and team allocation</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectAnalytics.map((projectData) => (
              <div key={projectData.project.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 truncate">{projectData.project.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    projectData.project.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : projectData.project.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {projectData.project.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Tasks:</span>
                    <span>{projectData.completedTasks}/{projectData.totalTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Progress:</span>
                    <span>{projectData.project.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team Size:</span>
                    <span>{projectData.teamSize} members</span>
                  </div>
                  {projectData.overdueTasks > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Overdue:</span>
                      <span>{projectData.overdueTasks} tasks</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${projectData.completionRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {Math.round(projectData.completionRate)}% Complete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;