import React, { useState, useCallback, useEffect } from 'react';
import type { SidebarProps, TimelineTask } from '@/types/timeline.types';
import { ACCESSIBILITY } from '@/constants/timeline.constants';

export const TaskDetailSidebar: React.FC<SidebarProps> = ({
  isOpen,
  task,
  onClose,
  onUpdate,
  onDelete
}) => {
  // Local form state
  const [formData, setFormData] = useState<Partial<TimelineTask>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Update form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
        progress: task.progress,
        assignee: task.assignee || '',
        color: task.color || '#0ea5e9',
        notes: task.notes || '',
        isMilestone: task.isMilestone || false
      });
      setHasChanges(false);
    }
  }, [task]);

  // Handle form changes
  const handleInputChange = useCallback((
    field: keyof TimelineTask,
    value: string | number | boolean | Date
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  }, []);

  // Handle save
  const handleSave = useCallback(() => {
    if (!task || !hasChanges) return;

    // Validate dates
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      alert('Start date must be before end date');
      return;
    }

    onUpdate(task.id, formData);
    setHasChanges(false);
  }, [task, formData, hasChanges, onUpdate]);

  // Handle delete
  const handleDelete = useCallback(() => {
    if (!task || !onDelete) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  }, [task, onDelete, onClose]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      handleSave();
    }
  }, [onClose, handleSave]);

  // Format date for input
  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  if (!task) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-96 bg-white border-l border-neutral-200 shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role={ACCESSIBILITY.SIDEBAR_ROLE}
        aria-label="Task details"
        aria-hidden={!isOpen}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Task Details</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-neutral-100 transition-colors"
              aria-label="Close task details"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="task-title" className="block text-sm font-medium text-neutral-700 mb-1">
              Task Title *
            </label>
            <input
              id="task-title"
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Milestone Toggle */}
          <div className="flex items-center">
            <input
              id="task-milestone"
              type="checkbox"
              checked={formData.isMilestone || false}
              onChange={(e) => handleInputChange('isMilestone', e.target.checked)}
              className="h-4 w-4 text-primary-600 rounded border-neutral-300 focus:ring-2 focus:ring-primary-500"
            />
            <label htmlFor="task-milestone" className="ml-2 text-sm text-neutral-700">
              This is a milestone
            </label>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-neutral-700 mb-1">
                Start Date *
              </label>
              <input
                id="start-date"
                type="date"
                value={formData.startDate ? formatDateForInput(formData.startDate) : ''}
                onChange={(e) => handleInputChange('startDate', new Date(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-neutral-700 mb-1">
                End Date *
              </label>
              <input
                id="end-date"
                type="date"
                value={formData.endDate ? formatDateForInput(formData.endDate) : ''}
                onChange={(e) => handleInputChange('endDate', new Date(e.target.value))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          {/* Progress (only if not milestone) */}
          {!formData.isMilestone && (
            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-neutral-700 mb-1">
                Progress: {formData.progress || 0}%
              </label>
              <input
                id="progress"
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.progress || 0}
                onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
                className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-neutral-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Assignee */}
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-neutral-700 mb-1">
              Assignee
            </label>
            <input
              id="assignee"
              type="text"
              value={formData.assignee || ''}
              onChange={(e) => handleInputChange('assignee', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter assignee name"
            />
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-neutral-700 mb-1">
              Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="color"
                type="color"
                value={formData.color || '#0ea5e9'}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="w-12 h-8 rounded border border-neutral-300 cursor-pointer"
              />
              <input
                type="text"
                value={formData.color || '#0ea5e9'}
                onChange={(e) => handleInputChange('color', e.target.value)}
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                placeholder="#0ea5e9"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-neutral-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add notes about this task..."
            />
          </div>

          {/* Dependencies Info */}
          {task.dependencies && task.dependencies.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Dependencies
              </label>
              <div className="text-sm text-neutral-600">
                This task depends on {task.dependencies.length} other task(s)
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-4">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={!hasChanges}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-white text-neutral-700 border border-neutral-300 rounded-md hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
            {onDelete && (
              <button
                onClick={handleDelete}
                className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Delete task"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v1H4V5zM3 8a1 1 0 011-1h12a1 1 0 110 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          
          {hasChanges && (
            <div className="mt-2 text-xs text-neutral-500">
              Press Ctrl+Enter to save quickly
            </div>
          )}
        </div>
      </aside>
    </>
  );
};