import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { 
  TimelineViewProps, 
  DragState, 
  TimelineTask
} from '@/types/timeline.types';
import { TimelineGrid } from './TimelineGrid';
import { TaskBar } from './TaskBar';
import { DependencyLine } from './DependencyLine';
import { TaskDetailSidebar } from './TaskDetailSidebar';
import { DEFAULT_TIMELINE_CONFIG } from '@/constants/timeline.constants';
import { 
  calculatePosition, 
  calculateDuration, 
  getTimeScale,
  getMousePositionInTimeline,
  getRowIndexFromY
} from '@/utils/position.utils';
import { calculateDependencyLines } from '@/utils/dependency.utils';
import { addDays } from '@/utils/date.utils';

export const TimelineView: React.FC<TimelineViewProps> = ({
  rows,
  tasks,
  startDate,
  endDate,
  viewMode,
  onTaskUpdate,
  onTaskMove,
  className = ''
}) => {
  // State
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    taskId: null,
    initialMouseX: 0,
    initialTaskStart: null,
    initialTaskEnd: null,
    currentRowId: null
  });

  // Refs
  const timelineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Derived values
  const timeScale = getTimeScale(viewMode);
  const config = DEFAULT_TIMELINE_CONFIG;
  
  // Get row index helper
  const getRowIndex = useCallback((rowId: string): number => {
    return rows.findIndex(row => row.id === rowId);
  }, [rows]);

  // Calculate dependency lines
  const dependencyLines = calculateDependencyLines(
    tasks,
    startDate,
    timeScale.pixelsPerDay,
    config.rowHeight,
    getRowIndex
  );

  // Task click handler
  const handleTaskClick = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
    setSidebarOpen(true);
  }, []);

  // Drag handlers
  const handleMouseDown = useCallback((
    event: React.MouseEvent,
    taskId: string,
    dragType: 'move' | 'resize-left' | 'resize-right'
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const task = tasks[taskId];
    if (!task) return;

    setDragState({
      isDragging: true,
      dragType,
      taskId,
      initialMouseX: event.clientX,
      initialTaskStart: new Date(task.startDate),
      initialTaskEnd: new Date(task.endDate),
      currentRowId: task.rowId
    });

    // Add global mouse event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [tasks]);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!dragState.isDragging || !dragState.taskId || !timelineRef.current) return;

    const mousePos = getMousePositionInTimeline(event, timelineRef.current);
    const deltaX = event.clientX - dragState.initialMouseX;
    const deltaDate = Math.round(deltaX / timeScale.pixelsPerDay);

    const task = tasks[dragState.taskId];
    if (!task || !dragState.initialTaskStart || !dragState.initialTaskEnd) return;

    let newStartDate = new Date(dragState.initialTaskStart);
    let newEndDate = new Date(dragState.initialTaskEnd);
    let newRowId = task.rowId;

    // Calculate new row if dragging vertically
    if (dragState.dragType === 'move') {
      const rowIndex = getRowIndexFromY(mousePos.y, config.rowHeight, config.headerHeight);
      if (rowIndex >= 0 && rowIndex < rows.length) {
        newRowId = rows[rowIndex].id;
      }
    }

    // Calculate new dates based on drag type
    switch (dragState.dragType) {
      case 'move':
        newStartDate = addDays(dragState.initialTaskStart, deltaDate);
        newEndDate = addDays(dragState.initialTaskEnd, deltaDate);
        break;
      case 'resize-left':
        newStartDate = addDays(dragState.initialTaskStart, deltaDate);
        // Ensure start date doesn't go past end date
        if (newStartDate >= newEndDate) {
          newStartDate = addDays(newEndDate, -1);
        }
        break;
      case 'resize-right':
        newEndDate = addDays(dragState.initialTaskEnd, deltaDate);
        // Ensure end date doesn't go before start date
        if (newEndDate <= newStartDate) {
          newEndDate = addDays(newStartDate, 1);
        }
        break;
    }

    // Update drag state for visual feedback
    setDragState(prev => ({ ...prev, currentRowId: newRowId }));

    // Apply visual changes immediately for smooth dragging
    // This would typically update a temporary state for visual feedback
  }, [dragState, tasks, timeScale.pixelsPerDay, rows, config.headerHeight, config.rowHeight]);

  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging && dragState.taskId) {
      const task = tasks[dragState.taskId];
      if (task && dragState.initialTaskStart && dragState.initialTaskEnd) {
        const deltaX = 0; // Calculate actual delta from current position
        const deltaDate = Math.round(deltaX / timeScale.pixelsPerDay);

        let newStartDate = new Date(dragState.initialTaskStart);
        let newEndDate = new Date(dragState.initialTaskEnd);

        switch (dragState.dragType) {
          case 'move':
            newStartDate = addDays(dragState.initialTaskStart, deltaDate);
            newEndDate = addDays(dragState.initialTaskEnd, deltaDate);
            if (dragState.currentRowId && dragState.currentRowId !== task.rowId) {
              onTaskMove(dragState.taskId, dragState.currentRowId, newStartDate);
            } else {
              onTaskUpdate(dragState.taskId, { startDate: newStartDate, endDate: newEndDate });
            }
            break;
          case 'resize-left':
            newStartDate = addDays(dragState.initialTaskStart, deltaDate);
            if (newStartDate < newEndDate) {
              onTaskUpdate(dragState.taskId, { startDate: newStartDate });
            }
            break;
          case 'resize-right':
            newEndDate = addDays(dragState.initialTaskEnd, deltaDate);
            if (newEndDate > newStartDate) {
              onTaskUpdate(dragState.taskId, { endDate: newEndDate });
            }
            break;
        }
      }
    }

    // Reset drag state
    setDragState({
      isDragging: false,
      dragType: null,
      taskId: null,
      initialMouseX: 0,
      initialTaskStart: null,
      initialTaskEnd: null,
      currentRowId: null
    });

    // Remove global event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [dragState, tasks, timeScale.pixelsPerDay, onTaskUpdate, onTaskMove]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Sidebar handlers
  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
    setSelectedTaskId(null);
  }, []);

  const handleTaskUpdateFromSidebar = useCallback((taskId: string, updates: Partial<TimelineTask>) => {
    onTaskUpdate(taskId, updates);
  }, [onTaskUpdate]);

  const selectedTask = selectedTaskId ? tasks[selectedTaskId] : null;

  return (
    <div className={`timeline-view relative bg-white border border-neutral-200 rounded-lg overflow-hidden ${className}`}>
      {/* Main timeline container */}
      <div 
        ref={timelineRef}
        className="timeline-container relative flex"
        role="application"
        aria-label="Timeline view"
      >
        {/* Timeline grid and content */}
        <TimelineGrid
          ref={gridRef}
          rows={rows}
          startDate={startDate}
          endDate={endDate}
          config={config}
          timeScale={timeScale}
        >
          {/* Dependency lines */}
          <svg 
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 5 }}
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
            {dependencyLines.map(line => (
              <DependencyLine key={line.id} line={line} />
            ))}
          </svg>

          {/* Task bars */}
          {Object.values(tasks).map(task => {
            const rowIndex = getRowIndex(task.rowId);
            if (rowIndex === -1) return null;

            const left = calculatePosition(task.startDate, startDate, timeScale.pixelsPerDay);
            const width = calculateDuration(task.startDate, task.endDate, timeScale.pixelsPerDay);
            const top = rowIndex * config.rowHeight + 8;
            const isSelected = selectedTaskId === task.id;
            const isDragging = dragState.taskId === task.id && dragState.isDragging;

            return (
              <TaskBar
                key={task.id}
                task={task}
                style={{
                  position: 'absolute',
                  left: `${left}px`,
                  width: `${width}px`,
                  top: `${top}px`,
                  zIndex: isDragging ? 20 : 10,
                  transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                  opacity: isDragging ? 0.8 : 1,
                }}
                isSelected={isSelected}
                isDragging={isDragging}
                onClick={() => handleTaskClick(task.id)}
                onMouseDown={(event, dragType) => handleMouseDown(event, task.id, dragType)}
              />
            );
          })}
        </TimelineGrid>
      </div>

      {/* Task detail sidebar */}
      <TaskDetailSidebar
        isOpen={sidebarOpen}
        task={selectedTask}
        onClose={handleSidebarClose}
        onUpdate={handleTaskUpdateFromSidebar}
      />
    </div>
  );
};