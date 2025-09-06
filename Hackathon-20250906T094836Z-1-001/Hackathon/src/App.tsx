import React, { useState, useEffect } from 'react';
import { User, Project, Task, Notification, Discussion } from './types';
import { dummyUsers, dummyProjects, dummyTasks, dummyNotifications, dummyDiscussions } from './data/dummyData';
import { useAuth } from './hooks/useAuth';

// Components
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import DashboardView from './components/Dashboard/DashboardView';
import ProjectsView from './components/Projects/ProjectsView';
import TasksView from './components/Tasks/TasksView';
import UsersView from './components/Users/UsersView';
import AnalyticsView from './components/Analytics/AnalyticsView';
import SWOTView from './components/SWOT/SWOTView';
import NotificationsView from './components/Notifications/NotificationsView';
import ProfileView from './components/Profile/ProfileView';

function App() {
  const { currentUser, login, logout, initializeAuth, isLoading } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');
  
  // App state
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [discussions, setDiscussions] = useState<Discussion[]>(dummyDiscussions);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Handlers
  const handleProjectUpdate = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId ? { ...project, ...updates } : project
    ));
    
    // Add notification for project update
    if (currentUser) {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          userId: currentUser.id,
          type: 'project_update',
          title: 'Project Updated',
          message: `Project "${project.name}" has been updated`,
          timestamp: new Date().toISOString(),
          read: false,
          actionUrl: `/projects/${projectId}`
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }
  };

  const handleProjectDelete = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    setTasks(prev => prev.filter(task => task.projectId !== projectId));
  };

  const handleProjectCreate = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString()
    };
    setProjects(prev => [project, ...prev]);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedTask = { ...task, ...updates, updatedAt: new Date().toISOString() };
        
        // Add notification if status changed to done
        if (updates.status === 'done' && task.status !== 'done') {
          const assignee = users.find(u => u.id === task.assigneeId);
          if (assignee && currentUser) {
            const newNotification: Notification = {
              id: Date.now().toString(),
              userId: currentUser.id,
              type: 'task_completed',
              title: 'Task Completed',
              message: `"${task.title}" has been completed by ${assignee.name}`,
              timestamp: new Date().toISOString(),
              read: false,
              actionUrl: `/tasks/${taskId}`
            };
            setNotifications(prev => [newNotification, ...prev]);
          }
        }
        
        return updatedTask;
      }
      return task;
    }));
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskCreate = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'timeTracked'>) => {
    const now = new Date().toISOString();
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
      timeTracked: 0
    };
    setTasks(prev => [task, ...prev]);
    
    // Add notification for task assignment
    if (newTask.assigneeId && currentUser) {
      const assignee = users.find(u => u.id === newTask.assigneeId);
      if (assignee) {
        const newNotification: Notification = {
          id: (Date.now() + 1).toString(),
          userId: newTask.assigneeId,
          type: 'task_assigned',
          title: 'New Task Assigned',
          message: `You have been assigned "${newTask.title}"`,
          timestamp: now,
          read: false,
          actionUrl: `/tasks/${task.id}`
        };
        setNotifications(prev => [newNotification, ...prev]);
      }
    }
  };

  const handleUserUpdate = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    
    // Update current user if it's the same user
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const handleUserDelete = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    if (currentUser) {
      setNotifications(prev => prev.map(notification =>
        notification.userId === currentUser.id ? { ...notification, read: true } : notification
      ));
    }
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const handleUpdateProfile = (updates: Partial<User>) => {
    if (currentUser) {
      handleUserUpdate(currentUser.id, updates);
    }
  };

  const handleProfileClick = () => {
    setActiveView('profile');
  };

  // Get unread notification count for current user
  const unreadNotificationCount = currentUser 
    ? notifications.filter(n => n.userId === currentUser.id && !n.read).length 
    : 0;

  if (!currentUser) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <DashboardView
            currentUser={currentUser}
            users={users}
            projects={projects}
            tasks={tasks}
          />
        );
      case 'projects':
        return (
          <ProjectsView
            currentUser={currentUser}
            users={users}
            projects={projects}
            tasks={tasks}
            onProjectUpdate={handleProjectUpdate}
            onProjectDelete={handleProjectDelete}
            onProjectCreate={handleProjectCreate}
          />
        );
      case 'tasks':
        return (
          <TasksView
            currentUser={currentUser}
            users={users}
            projects={projects}
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onTaskCreate={handleTaskCreate}
          />
        );
      case 'users':
        return (
          <UsersView
            currentUser={currentUser}
            users={users}
            tasks={tasks}
            projects={projects}
            onUserUpdate={handleUserUpdate}
            onUserDelete={handleUserDelete}
          />
        );
      case 'analytics':
        return (
          <AnalyticsView
            currentUser={currentUser}
            users={users}
            tasks={tasks}
            projects={projects}
          />
        );
      case 'swot':
        return (
          <SWOTView
            currentUser={currentUser}
            users={users}
          />
        );
      case 'notifications':
        return (
          <NotificationsView
            currentUser={currentUser}
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
            onDeleteNotification={handleDeleteNotification}
          />
        );
      case 'profile':
        return (
          <ProfileView
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return (
          <DashboardView
            currentUser={currentUser}
            users={users}
            projects={projects}
            tasks={tasks}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        currentUser={currentUser}
        activeView={activeView}
        onViewChange={setActiveView}
        notificationCount={unreadNotificationCount}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          currentUser={currentUser}
          onLogout={logout}
          onProfileClick={handleProfileClick}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}

export default App;