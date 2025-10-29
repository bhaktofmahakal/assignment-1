import type { TimelineRow, TimelineTask } from '@/types/timeline.types';

// Sample rows/resources
export const sampleRows: TimelineRow[] = [
  {
    id: 'row-1',
    label: 'Frontend Team',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    tasks: ['task-1', 'task-2', 'task-8'],
  },
  {
    id: 'row-2',
    label: 'Backend Team',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    tasks: ['task-3', 'task-4', 'task-9'],
  },
  {
    id: 'row-3',
    label: 'Design Team',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    tasks: ['task-5', 'task-6', 'task-10'],
  },
  {
    id: 'row-4',
    label: 'QA Team',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    tasks: ['task-7', 'task-11'],
  },
];

// Helper function to create dates relative to today
const today = new Date();
const getDate = (offsetDays: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

// Sample tasks
export const sampleTasks: Record<string, TimelineTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Component Architecture',
    startDate: getDate(-7),
    endDate: getDate(-3),
    progress: 100,
    assignee: 'John Doe',
    rowId: 'row-1',
    color: '#10b981',
    isMilestone: false,
    dependencies: [],
  },
  'task-2': {
    id: 'task-2',
    title: 'UI Implementation',
    startDate: getDate(-2),
    endDate: getDate(5),
    progress: 60,
    assignee: 'John Doe',
    rowId: 'row-1',
    color: '#3b82f6',
    isMilestone: false,
    dependencies: ['task-1'],
  },
  'task-3': {
    id: 'task-3',
    title: 'API Development',
    startDate: getDate(-5),
    endDate: getDate(2),
    progress: 80,
    assignee: 'Jane Smith',
    rowId: 'row-2',
    color: '#8b5cf6',
    isMilestone: false,
    dependencies: [],
  },
  'task-4': {
    id: 'task-4',
    title: 'Database Setup',
    startDate: getDate(3),
    endDate: getDate(8),
    progress: 25,
    assignee: 'Jane Smith',
    rowId: 'row-2',
    color: '#f59e0b',
    isMilestone: false,
    dependencies: ['task-3'],
  },
  'task-5': {
    id: 'task-5',
    title: 'Design System',
    startDate: getDate(-10),
    endDate: getDate(-5),
    progress: 100,
    assignee: 'Alice Johnson',
    rowId: 'row-3',
    color: '#ec4899',
    isMilestone: false,
    dependencies: [],
  },
  'task-6': {
    id: 'task-6',
    title: 'User Research',
    startDate: getDate(-3),
    endDate: getDate(4),
    progress: 45,
    assignee: 'Alice Johnson',
    rowId: 'row-3',
    color: '#06b6d4',
    isMilestone: false,
    dependencies: ['task-5'],
  },
  'task-7': {
    id: 'task-7',
    title: 'Testing Phase',
    startDate: getDate(6),
    endDate: getDate(12),
    progress: 0,
    assignee: 'Bob Wilson',
    rowId: 'row-4',
    color: '#ef4444',
    isMilestone: false,
    dependencies: ['task-2', 'task-4'],
  },
  'task-8': {
    id: 'task-8',
    title: 'Launch Milestone',
    startDate: getDate(15),
    endDate: getDate(15),
    progress: 0,
    assignee: 'Team Lead',
    rowId: 'row-1',
    color: '#f97316',
    isMilestone: true,
    dependencies: ['task-7'],
  },
  'task-9': {
    id: 'task-9',
    title: 'Performance Optimization',
    startDate: getDate(1),
    endDate: getDate(7),
    progress: 30,
    assignee: 'Jane Smith',
    rowId: 'row-2',
    color: '#84cc16',
    isMilestone: false,
    dependencies: ['task-3'],
  },
  'task-10': {
    id: 'task-10',
    title: 'Accessibility Audit',
    startDate: getDate(4),
    endDate: getDate(9),
    progress: 20,
    assignee: 'Alice Johnson',
    rowId: 'row-3',
    color: '#6366f1',
    isMilestone: false,
    dependencies: ['task-6'],
  },
  'task-11': {
    id: 'task-11',
    title: 'Bug Fixes',
    startDate: getDate(10),
    endDate: getDate(14),
    progress: 0,
    assignee: 'Bob Wilson',
    rowId: 'row-4',
    color: '#d946ef',
    isMilestone: false,
    dependencies: ['task-7'],
  },
};

// Large dataset for performance testing
export const generateLargeDataset = (taskCount: number = 100) => {
  const rows: TimelineRow[] = [];
  const tasks: Record<string, TimelineTask> = {};
  
  const teams = ['Frontend', 'Backend', 'Design', 'QA', 'DevOps', 'Marketing', 'Sales', 'Support'];
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#ef4444', '#f97316', '#84cc16', '#6366f1'];
  const taskTypes = ['Development', 'Testing', 'Design', 'Research', 'Planning', 'Review', 'Deployment', 'Optimization'];
  
  // Create rows
  for (let i = 0; i < Math.min(teams.length, Math.ceil(taskCount / 12)); i++) {
    rows.push({
      id: `row-${i + 1}`,
      label: `${teams[i]} Team`,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=32&h=32&fit=crop&crop=face`,
      tasks: [],
    });
  }
  
  // Create tasks
  for (let i = 0; i < taskCount; i++) {
    const rowIndex = i % rows.length;
    const startOffset = Math.floor(Math.random() * 60) - 30; // -30 to +30 days from today
    const duration = Math.floor(Math.random() * 14) + 1; // 1 to 14 days duration
    
    const taskId = `task-${i + 1}`;
    const task: TimelineTask = {
      id: taskId,
      title: `${taskTypes[i % taskTypes.length]} ${Math.floor(i / taskTypes.length) + 1}`,
      startDate: getDate(startOffset),
      endDate: getDate(startOffset + duration),
      progress: Math.floor(Math.random() * 101),
      assignee: `User ${i + 1}`,
      rowId: rows[rowIndex].id,
      color: colors[i % colors.length],
      isMilestone: Math.random() < 0.1, // 10% chance of being a milestone
      dependencies: i > 0 && Math.random() < 0.3 ? [`task-${Math.floor(Math.random() * i) + 1}`] : [],
    };
    
    tasks[taskId] = task;
    rows[rowIndex].tasks.push(taskId);
  }
  
  return { rows, tasks };
};

// Timeline date ranges
export const getTimelineRange = () => {
  return {
    startDate: getDate(-15),
    endDate: getDate(25),
  };
};