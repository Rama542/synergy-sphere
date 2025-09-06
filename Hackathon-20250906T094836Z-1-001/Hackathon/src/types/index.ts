export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  avatar?: string;
  title: string;
  department: string;
  phone: string;
  location: string;
  about: string;
  skills: string[];
  joinDate: string;
  banned: boolean;
  performance: {
    tasksCompleted: number;
    tasksInProgress: number;
    averageCompletionTime: number;
    successRate: number;
  };
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  progress: number;
  teamMembers: string[];
  adminId: string;
  priority: 'low' | 'medium' | 'high';
  budget?: number;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  assignedBy: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  timeTracked: number;
  estimatedHours: number;
  tags: string[];
}

export interface Discussion {
  id: string;
  projectId: string;
  userId: string;
  message: string;
  timestamp: string;
  replies: Discussion[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'task_assigned' | 'task_completed' | 'project_update' | 'deadline_reminder' | 'discussion';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface AppState {
  currentUser: User | null;
  users: User[];
  projects: Project[];
  tasks: Task[];
  discussions: Discussion[];
  notifications: Notification[];
}