import React, { useState, useCallback } from 'react';
import type { TimelineTask } from '@/types/timeline.types';
import { formatDate } from '@/utils/date.utils';
import { ACCESSIBILITY } from '@/constants/timeline.constants';

interface TaskBarProps {
  task: TimelineTask;
  style: React.CSSProperties;
  isSelected: boolean;
  isDragging: boolean;
  onClick: () => void;
  onMouseDown: (event: React.MouseEvent, dragType: 'move' | 'resize-left' | 'resize-right') => void;
}

export const TaskBar: React.FC<TaskBarProps> = ({
  task,
  style,
  isSelected,
  isDragging,
  onClick,
  onMouseDown
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  }, [onClick]);

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  }, [onClick]);

  const handleResizeMouseDown = useCallback((
    event: React.MouseEvent, 
    side: 'left' | 'right'
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onMouseDown(event, side === 'left' ? 'resize-left' : 'resize-right');
  }, [onMouseDown]);

  const handleMoveMouseDown = useCallback((event: React.MouseEvent) => {
    // Only start move drag if not clicking on resize handles
    const target = event.target as HTMLElement;
    if (target.classList.contains('resize-handle')) return;
    
    event.preventDefault();
    event.stopPropagation();
    onMouseDown(event, 'move');
  }, [onMouseDown]);

  const progressPercentage = Math.max(0, Math.min(100, task.progress));
  const taskColor = task.color || '#0ea5e9';

  return (
    <div
      className={`task-bar group relative rounded cursor-move transition-all duration-200 select-none ${
        isSelected ? 'ring-2 ring-primary-500 ring-offset-1' : ''
      } ${
        isDragging ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
      }`}
      style={{
        ...style,
        backgroundColor: taskColor,
        opacity: isDragging ? 0.8 : 1,
      }}
      role={ACCESSIBILITY.TASK_ROLE}
      tabIndex={0}
      aria-label={`${task.title}. From ${formatDate(task.startDate)} to ${formatDate(task.endDate)}. Progress: ${progressPercentage}%. Press Enter to edit.`}
      aria-describedby={`task-${task.id}-tooltip`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onMouseDown={handleMoveMouseDown}
    >
      {/* Task content */}
      <div className="flex items-center justify-between h-full px-2 py-1">
        <span className="text-xs font-medium text-white truncate flex-1 mr-1">
          {task.title}
        </span>
        {!task.isMilestone && (
          <span className="text-xs text-white opacity-75 flex-shrink-0">
            {progressPercentage}%
          </span>
        )}
      </div>

      {/* Progress bar overlay */}
      {!task.isMilestone && progressPercentage > 0 && (
        <div
          className="absolute bottom-0 left-0 h-1 bg-white opacity-40 rounded-b transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
          aria-hidden="true"
        />
      )}

      {/* Resize handles */}
      <div
        className="resize-handle absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity bg-white rounded-l"
        onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
        aria-label="Resize task start date"
        role="button"
        tabIndex={-1}
      />
      <div
        className="resize-handle absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity bg-white rounded-r"
        onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
        aria-label="Resize task end date"
        role="button"
        tabIndex={-1}
      />

      {/* Milestone marker */}
      {task.isMilestone && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-4 h-4 transform rotate-45 border-2 border-white"
            style={{ backgroundColor: taskColor }}
            aria-label="Milestone"
          />
        </div>
      )}

      {/* Tooltip */}
      {isHovered && (
        <div
          id={`task-${task.id}-tooltip`}
          className="absolute z-50 px-2 py-1 text-xs text-white bg-neutral-900 rounded shadow-lg pointer-events-none animate-fade-in"
          style={{
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '4px',
            maxWidth: '200px',
          }}
          role="tooltip"
        >
          <div className="font-medium">{task.title}</div>
          <div className="opacity-75">
            {formatDate(task.startDate, 'short')} - {formatDate(task.endDate, 'short')}
          </div>
          {task.assignee && (
            <div className="opacity-75">Assigned to: {task.assignee}</div>
          )}
          {!task.isMilestone && (
            <div className="opacity-75">Progress: {progressPercentage}%</div>
          )}
          
          {/* Tooltip arrow */}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-neutral-900"
          />
        </div>
      )}
    </div>
  );
};