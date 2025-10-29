import type { TimelineConfig } from '@/types/timeline.types';

export const DEFAULT_TIMELINE_CONFIG: TimelineConfig = {
  rowHeight: 64,
  headerHeight: 48,
  leftPanelWidth: 200,
  minTaskWidth: 20,
  gridLineColor: '#e4e4e7', // neutral-200
  currentDateColor: '#ef4444', // red-500
};

export const VIEW_MODE_SETTINGS = {
  day: {
    pixelsPerDay: 40,
    columnWidth: 40,
    minVisibleDays: 7,
    maxVisibleDays: 31,
  },
  week: {
    pixelsPerDay: 80 / 7,
    columnWidth: 80,
    minVisibleDays: 21,
    maxVisibleDays: 84,
  },
  month: {
    pixelsPerDay: 120 / 30,
    columnWidth: 120,
    minVisibleDays: 90,
    maxVisibleDays: 365,
  },
} as const;

export const KEYBOARD_SHORTCUTS = {
  ZOOM_IN: '+',
  ZOOM_OUT: '-',
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  SPACE: ' ',
  TAB: 'Tab',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
} as const;

export const DRAG_TYPES = {
  MOVE: 'move',
  RESIZE_LEFT: 'resize-left',
  RESIZE_RIGHT: 'resize-right',
} as const;

export const COLORS = {
  PRIMARY: '#0ea5e9',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#6366f1',
  NEUTRAL: '#6b7280',
} as const;

export const DEFAULT_TASK_COLORS = [
  COLORS.PRIMARY,
  COLORS.SUCCESS,
  COLORS.WARNING,
  COLORS.ERROR,
  COLORS.INFO,
  COLORS.NEUTRAL,
] as const;

export const ACCESSIBILITY = {
  TASK_ROLE: 'button',
  TIMELINE_ROLE: 'region',
  SIDEBAR_ROLE: 'complementary',
  GRID_ROLE: 'grid',
  ROW_ROLE: 'row',
  CELL_ROLE: 'gridcell',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: '150ms',
  NORMAL: '300ms',
  SLOW: '500ms',
} as const;

export const Z_INDEX = {
  TASK_BAR: 10,
  DRAGGING_TASK: 20,
  DEPENDENCY_LINES: 5,
  CURRENT_DATE_LINE: 15,
  SIDEBAR: 30,
  MODAL: 40,
  TOOLTIP: 50,
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
} as const;