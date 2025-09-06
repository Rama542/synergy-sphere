import { User, Project, Task, Discussion, Notification } from '../types';

export const dummyUsers: User[] = [
  {
    id: '1',
    email: 'admin@synergysphere.com',
    name: 'Sarah Johnson',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: 'Operations Director',
    department: 'Management',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    about: 'Experienced operations director with 10+ years in team management and strategic planning. Passionate about driving organizational excellence and fostering collaborative work environments.',
    skills: ['Leadership', 'Strategic Planning', 'Operations Management', 'Team Building'],
    joinDate: '2020-01-15',
    banned: false,
    performance: {
      tasksCompleted: 156,
      tasksInProgress: 8,
      averageCompletionTime: 2.5,
      successRate: 94
    },
    swot: {
      strengths: ['Strong leadership skills', 'Excellent communication', 'Strategic thinking', 'Problem-solving abilities'],
      weaknesses: ['Sometimes micromanages', 'Can be overly perfectionist'],
      opportunities: ['Digital transformation initiatives', 'Cross-functional collaboration', 'Mentorship programs'],
      threats: ['Rapid industry changes', 'Resource constraints', 'Competing priorities']
    }
  },
  {
    id: '2',
    email: 'john.smith@synergysphere.com',
    name: 'John Smith',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    about: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and mentoring junior developers.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    joinDate: '2021-03-10',
    banned: false,
    performance: {
      tasksCompleted: 89,
      tasksInProgress: 5,
      averageCompletionTime: 3.2,
      successRate: 91
    },
    swot: {
      strengths: ['Technical expertise', 'Quick learner', 'Team player', 'Innovation mindset'],
      weaknesses: ['Sometimes over-engineers solutions', 'Could improve documentation skills'],
      opportunities: ['AI/ML integration projects', 'Technical leadership roles', 'Open source contributions'],
      threats: ['Rapid technology evolution', 'Burnout risk', 'Competition from automation']
    }
  },
  {
    id: '3',
    email: 'emily.davis@synergysphere.com',
    name: 'Emily Davis',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: 'UX/UI Designer',
    department: 'Design',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    about: 'Creative designer with a focus on user experience and interface design. Skilled in creating intuitive and engaging digital experiences that drive user satisfaction.',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping', 'Design Systems'],
    joinDate: '2021-07-22',
    banned: false,
    performance: {
      tasksCompleted: 67,
      tasksInProgress: 4,
      averageCompletionTime: 4.1,
      successRate: 88
    },
    swot: {
      strengths: ['Creative thinking', 'User-centered approach', 'Attention to detail', 'Collaborative mindset'],
      weaknesses: ['Perfectionist tendencies', 'Could improve technical knowledge'],
      opportunities: ['Mobile design specialization', 'Design system leadership', 'User research expansion'],
      threats: ['Design trend shifts', 'AI design tools', 'Budget constraints']
    }
  },
  {
    id: '4',
    email: 'mike.wilson@synergysphere.com',
    name: 'Mike Wilson',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: 'Project Manager',
    department: 'Operations',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    about: 'Results-driven project manager with experience in agile methodologies and cross-functional team coordination. Committed to delivering projects on time and within budget.',
    skills: ['Agile/Scrum', 'Risk Management', 'Stakeholder Communication', 'Resource Planning'],
    joinDate: '2020-11-08',
    banned: false,
    performance: {
      tasksCompleted: 134,
      tasksInProgress: 7,
      averageCompletionTime: 2.8,
      successRate: 92
    },
    swot: {
      strengths: ['Organization skills', 'Communication abilities', 'Risk assessment', 'Team coordination'],
      weaknesses: ['Limited technical background', 'Can be too process-oriented'],
      opportunities: ['Certification in advanced PM methodologies', 'Digital project tools mastery', 'Team leadership roles'],
      threats: ['Project automation tools', 'Resource allocation challenges', 'Changing project requirements']
    }
  },
  {
    id: '5',
    email: 'lisa.brown@synergysphere.com',
    name: 'Lisa Brown',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    title: 'Marketing Specialist',
    department: 'Marketing',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    about: 'Digital marketing specialist with expertise in content creation, social media management, and campaign optimization. Passionate about data-driven marketing strategies.',
    skills: ['Digital Marketing', 'Content Strategy', 'Social Media', 'Analytics', 'SEO/SEM'],
    joinDate: '2022-02-14',
    banned: false,
    performance: {
      tasksCompleted: 78,
      tasksInProgress: 6,
      averageCompletionTime: 3.5,
      successRate: 87
    },
    swot: {
      strengths: ['Creative content creation', 'Data analysis skills', 'Social media expertise', 'Campaign management'],
      weaknesses: ['Limited technical skills', 'Could improve project management'],
      opportunities: ['Marketing automation tools', 'Video content creation', 'Influencer partnerships'],
      threats: ['Privacy regulations', 'Ad-blocking technology', 'Market saturation']
    }
  }
];

export const dummyProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    description: 'Complete overhaul of the company e-commerce platform with modern UI/UX, improved performance, and mobile optimization.',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    progress: 65,
    teamMembers: ['2', '3', '4'],
    adminId: '1',
    priority: 'high',
    budget: 150000,
    tags: ['web-development', 'ui-ux', 'e-commerce']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Development of a cross-platform mobile application for customer engagement and service delivery.',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-08-15',
    progress: 40,
    teamMembers: ['2', '5'],
    adminId: '1',
    priority: 'high',
    budget: 200000,
    tags: ['mobile', 'react-native', 'customer-engagement']
  },
  {
    id: '3',
    name: 'Marketing Campaign Q2',
    description: 'Comprehensive marketing campaign for Q2 product launch including digital ads, content creation, and social media strategy.',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    progress: 75,
    teamMembers: ['5', '4'],
    adminId: '1',
    priority: 'medium',
    budget: 75000,
    tags: ['marketing', 'campaign', 'product-launch']
  },
  {
    id: '4',
    name: 'Internal Tools Optimization',
    description: 'Optimization and enhancement of internal productivity tools and workflows to improve team efficiency.',
    status: 'completed',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    progress: 100,
    teamMembers: ['2', '4'],
    adminId: '1',
    priority: 'medium',
    budget: 50000,
    tags: ['internal-tools', 'productivity', 'optimization']
  },
  {
    id: '5',
    name: 'Data Analytics Dashboard',
    description: 'Development of a comprehensive analytics dashboard for business intelligence and data visualization.',
    status: 'paused',
    startDate: '2024-01-01',
    endDate: '2024-05-30',
    progress: 25,
    teamMembers: ['2', '3'],
    adminId: '1',
    priority: 'low',
    budget: 100000,
    tags: ['analytics', 'dashboard', 'data-visualization']
  }
];

export const dummyTasks: Task[] = [
  // E-Commerce Platform Redesign Tasks
  {
    id: '1',
    title: 'Implement payment gateway integration',
    description: 'Integrate multiple payment gateways including PayPal, Stripe, and Apple Pay for seamless checkout experience.',
    projectId: '1',
    assigneeId: '2',
    assignedBy: '1',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-04-15',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10',
    timeTracked: 12,
    estimatedHours: 20,
    tags: ['backend', 'payment', 'integration']
  },
  {
    id: '2',
    title: 'Design product catalog interface',
    description: 'Create modern, responsive product catalog with filtering, sorting, and search capabilities.',
    projectId: '1',
    assigneeId: '3',
    assignedBy: '1',
    status: 'done',
    priority: 'high',
    dueDate: '2024-03-30',
    createdAt: '2024-02-15',
    updatedAt: '2024-03-25',
    timeTracked: 18,
    estimatedHours: 16,
    tags: ['ui-ux', 'catalog', 'responsive']
  },
  {
    id: '3',
    title: 'Optimize database queries',
    description: 'Improve database performance by optimizing queries and implementing proper indexing.',
    projectId: '1',
    assigneeId: '2',
    assignedBy: '4',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-04-30',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
    timeTracked: 0,
    estimatedHours: 12,
    tags: ['backend', 'database', 'performance']
  },
  // Mobile App Development Tasks
  {
    id: '4',
    title: 'Implement user authentication',
    description: 'Develop secure user authentication system with biometric support and social login options.',
    projectId: '2',
    assigneeId: '2',
    assignedBy: '1',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-04-20',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-12',
    timeTracked: 15,
    estimatedHours: 25,
    tags: ['mobile', 'authentication', 'security']
  },
  {
    id: '5',
    title: 'Create onboarding flow',
    description: 'Design and implement user-friendly onboarding experience with interactive tutorials.',
    projectId: '2',
    assigneeId: '3',
    assignedBy: '1',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-05-15',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    timeTracked: 0,
    estimatedHours: 14,
    tags: ['mobile', 'onboarding', 'ui-ux']
  },
  // Marketing Campaign Tasks
  {
    id: '6',
    title: 'Develop social media content calendar',
    description: 'Create comprehensive content calendar for all social media platforms for Q2 campaign.',
    projectId: '3',
    assigneeId: '5',
    assignedBy: '1',
    status: 'done',
    priority: 'high',
    dueDate: '2024-03-15',
    createdAt: '2024-02-20',
    updatedAt: '2024-03-10',
    timeTracked: 8,
    estimatedHours: 10,
    tags: ['marketing', 'social-media', 'content']
  },
  {
    id: '7',
    title: 'Launch digital advertising campaign',
    description: 'Set up and launch targeted digital advertising campaign across Google Ads and Facebook.',
    projectId: '3',
    assigneeId: '5',
    assignedBy: '4',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-04-10',
    createdAt: '2024-03-05',
    updatedAt: '2024-03-12',
    timeTracked: 6,
    estimatedHours: 12,
    tags: ['marketing', 'advertising', 'digital']
  },
  // Internal Tools Tasks
  {
    id: '8',
    title: 'Implement automated reporting',
    description: 'Create automated reporting system for project status and team productivity metrics.',
    projectId: '4',
    assigneeId: '2',
    assignedBy: '1',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-01-20',
    createdAt: '2023-12-15',
    updatedAt: '2024-01-18',
    timeTracked: 16,
    estimatedHours: 18,
    tags: ['automation', 'reporting', 'productivity']
  },
  // Analytics Dashboard Tasks
  {
    id: '9',
    title: 'Design dashboard wireframes',
    description: 'Create detailed wireframes and mockups for the analytics dashboard interface.',
    projectId: '5',
    assigneeId: '3',
    assignedBy: '1',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-02-15',
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10',
    timeTracked: 12,
    estimatedHours: 14,
    tags: ['analytics', 'wireframes', 'design']
  },
  {
    id: '10',
    title: 'Set up data pipeline',
    description: 'Establish data pipeline for real-time analytics and reporting from multiple sources.',
    projectId: '5',
    assigneeId: '2',
    assignedBy: '1',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-05-01',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    timeTracked: 0,
    estimatedHours: 20,
    tags: ['analytics', 'data-pipeline', 'backend']
  }
];

export const dummyDiscussions: Discussion[] = [
  {
    id: '1',
    projectId: '1',
    userId: '1',
    message: 'Great progress on the payment gateway integration! The initial tests look promising. Let me know if you need any additional resources.',
    timestamp: '2024-03-10T14:30:00Z',
    replies: [
      {
        id: '1-1',
        projectId: '1',
        userId: '2',
        message: 'Thanks Sarah! I might need some help with the Apple Pay configuration. Could we schedule a brief call tomorrow?',
        timestamp: '2024-03-10T15:45:00Z',
        replies: []
      }
    ]
  },
  {
    id: '2',
    projectId: '2',
    userId: '4',
    message: 'The mobile app wireframes look fantastic, Emily! The user flow is very intuitive. When can we expect the interactive prototypes?',
    timestamp: '2024-03-08T11:20:00Z',
    replies: [
      {
        id: '2-1',
        projectId: '2',
        userId: '3',
        message: 'Thank you Mike! I should have the interactive prototypes ready by end of this week. Just finalizing the onboarding animations.',
        timestamp: '2024-03-08T16:30:00Z',
        replies: []
      }
    ]
  },
  {
    id: '3',
    projectId: '3',
    userId: '5',
    message: 'The social media campaign is performing exceptionally well! Engagement rates are up 40% compared to last quarter.',
    timestamp: '2024-03-12T09:15:00Z',
    replies: []
  }
];

export const dummyNotifications: Notification[] = [
  {
    id: '1',
    userId: '2',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned to "Optimize database queries" in E-Commerce Platform Redesign',
    timestamp: '2024-03-15T10:00:00Z',
    read: false,
    actionUrl: '/tasks/3'
  },
  {
    id: '2',
    userId: '3',
    type: 'deadline_reminder',
    title: 'Deadline Reminder',
    message: 'Task "Create onboarding flow" is due in 3 days',
    timestamp: '2024-03-12T09:00:00Z',
    read: true,
    actionUrl: '/tasks/5'
  },
  {
    id: '3',
    userId: '5',
    type: 'project_update',
    title: 'Project Update',
    message: 'Marketing Campaign Q2 progress updated to 75%',
    timestamp: '2024-03-11T16:30:00Z',
    read: false,
    actionUrl: '/projects/3'
  },
  {
    id: '4',
    userId: '2',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'Emily Davis completed "Design product catalog interface"',
    timestamp: '2024-03-25T14:20:00Z',
    read: true,
    actionUrl: '/tasks/2'
  },
  {
    id: '5',
    userId: '4',
    type: 'discussion',
    title: 'New Discussion Message',
    message: 'Sarah Johnson posted a message in E-Commerce Platform Redesign',
    timestamp: '2024-03-10T14:30:00Z',
    read: false,
    actionUrl: '/projects/1/discussions'
  }
];