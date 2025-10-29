export interface TimelineTask {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  assignee?: string;
  rowId: string; // which row/resource this belongs to
  dependencies?: string[]; // IDs of tasks this depends on
  color?: string;
  isMilestone?: boolean;
  notes?: string;
}

export interface TimelineRow {
  id: string;
  label: string;
  avatar?: string;
  tasks: string[]; // task IDs assigned to this row
}

export interface TimelineViewProps {
  rows: TimelineRow[];
  tasks: Record<string, TimelineTask>;
  startDate: Date;
  endDate: Date;
  viewMode: ViewMode;
  onTaskUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
  onTaskMove: (taskId: string, newRowId: string, newStartDate: Date) => void;
  className?: string;
}

export type ViewMode = 'day' | 'week' | 'month';

export interface TimeScale {
  viewMode: ViewMode;
  pixelsPerDay: number;
  columnWidth: number;
  labelFormat: (date: Date) => string;
  timeUnit: 'day' | 'week' | 'month';
}

export interface DragState {
  isDragging: boolean;
  dragType: 'move' | 'resize-left' | 'resize-right' | null;
  taskId: string | null;
  initialMouseX: number;
  initialTaskStart: Date | null;
  initialTaskEnd: Date | null;
  currentRowId: string | null;
}

export interface Position {
  x: number;
  y: number;
}

export interface TaskDimensions {
  left: number;
  width: number;
  top: number;
  height: number;
}

export interface TimelineConfig {
  rowHeight: number;
  headerHeight: number;
  leftPanelWidth: number;
  minTaskWidth: number;
  gridLineColor: string;
  currentDateColor: string;
}

export interface SidebarProps {
  isOpen: boolean;
  task: TimelineTask | null;
  onClose: () => void;
  onUpdate: (taskId: string, updates: Partial<TimelineTask>) => void;
  onDelete?: (taskId: string) => void;
}

export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}