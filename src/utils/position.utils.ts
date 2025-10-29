import type { ViewMode, TimeScale, TaskDimensions } from '@/types/timeline.types';
import { differenceInDays } from './date.utils';

/**
 * Position utility functions for timeline calculations
 */

export const getTimeScale = (viewMode: ViewMode): TimeScale => {
  const timeScales: Record<ViewMode, TimeScale> = {
    day: {
      viewMode: 'day',
      pixelsPerDay: 40,
      columnWidth: 40,
      labelFormat: (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
      timeUnit: 'day'
    },
    week: {
      viewMode: 'week',
      pixelsPerDay: 80 / 7, // 80px per week, divided by 7 days
      columnWidth: 80,
      labelFormat: (date: Date) => {
        const weekStart = startOfWeek(date);
        return `Week ${getWeekNumber(weekStart)}`;
      },
      timeUnit: 'week'
    },
    month: {
      viewMode: 'month',
      pixelsPerDay: 120 / 30, // Approximation: 120px per month, 30 days average
      columnWidth: 120,
      labelFormat: (date: Date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      timeUnit: 'month'
    }
  };

  return timeScales[viewMode];
};

export const calculatePosition = (date: Date, startDate: Date, pixelsPerDay: number): number => {
  const daysDiff = differenceInDays(date, startDate);
  return Math.max(0, daysDiff * pixelsPerDay);
};

export const calculateDuration = (startDate: Date, endDate: Date, pixelsPerDay: number): number => {
  const daysDiff = differenceInDays(endDate, startDate) + 1; // +1 to include end date
  return Math.max(20, daysDiff * pixelsPerDay); // Minimum 20px width
};

export const calculateDateFromPosition = (x: number, startDate: Date, pixelsPerDay: number): Date => {
  const days = Math.round(x / pixelsPerDay);
  const result = new Date(startDate);
  result.setDate(startDate.getDate() + days);
  return result;
};

export const calculateTaskDimensions = (
  task: { startDate: Date; endDate: Date },
  timelineStart: Date,
  pixelsPerDay: number,
  rowIndex: number,
  rowHeight: number
): TaskDimensions => {
  const left = calculatePosition(task.startDate, timelineStart, pixelsPerDay);
  const width = calculateDuration(task.startDate, task.endDate, pixelsPerDay);
  const top = rowIndex * rowHeight + 8; // 8px margin from row top
  const height = rowHeight - 16; // 16px margin (8px top + 8px bottom)

  return { left, width, top, height };
};

export const getMousePositionInTimeline = (
  event: MouseEvent,
  timelineElement: HTMLElement
): { x: number; y: number } => {
  const rect = timelineElement.getBoundingClientRect();
  return {
    x: event.clientX - rect.left + timelineElement.scrollLeft,
    y: event.clientY - rect.top + timelineElement.scrollTop
  };
};

export const getRowIndexFromY = (y: number, rowHeight: number, headerHeight: number): number => {
  return Math.floor((y - headerHeight) / rowHeight);
};

export const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const constrainToTimeline = (
  position: number,
  timelineStart: Date,
  timelineEnd: Date,
  pixelsPerDay: number
): number => {
  const minPosition = 0;
  const maxPosition = differenceInDays(timelineEnd, timelineStart) * pixelsPerDay;
  
  return Math.max(minPosition, Math.min(maxPosition, position));
};

export const isPointInRect = (
  point: { x: number; y: number },
  rect: { left: number; top: number; width: number; height: number }
): boolean => {
  return (
    point.x >= rect.left &&
    point.x <= rect.left + rect.width &&
    point.y >= rect.top &&
    point.y <= rect.top + rect.height
  );
};

export const getResizeHandleAtPosition = (
  x: number,
  taskRect: { left: number; width: number },
  handleWidth: number = 8
): 'left' | 'right' | null => {
  const leftHandleStart = taskRect.left;
  const leftHandleEnd = taskRect.left + handleWidth;
  const rightHandleStart = taskRect.left + taskRect.width - handleWidth;
  const rightHandleEnd = taskRect.left + taskRect.width;

  if (x >= leftHandleStart && x <= leftHandleEnd) {
    return 'left';
  }
  if (x >= rightHandleStart && x <= rightHandleEnd) {
    return 'right';
  }
  
  return null;
};

// Helper functions used internally
const startOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};