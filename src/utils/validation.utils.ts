import type { TimelineTask, TimelineRow } from '@/types/timeline.types';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateTask = (task: Partial<TimelineTask>): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!task.title || task.title.trim() === '') {
    errors.push({ field: 'title', message: 'Task title is required' });
  }

  if (!task.startDate) {
    errors.push({ field: 'startDate', message: 'Start date is required' });
  }

  if (!task.endDate) {
    errors.push({ field: 'endDate', message: 'End date is required' });
  }

  if (!task.rowId || task.rowId.trim() === '') {
    errors.push({ field: 'rowId', message: 'Row ID is required' });
  }

  // Date validation
  if (task.startDate && task.endDate && task.startDate >= task.endDate) {
    errors.push({ field: 'endDate', message: 'End date must be after start date' });
  }

  // Progress validation
  if (typeof task.progress === 'number') {
    if (task.progress < 0 || task.progress > 100) {
      errors.push({ field: 'progress', message: 'Progress must be between 0 and 100' });
    }
  }

  // Color validation
  if (task.color && !isValidHexColor(task.color)) {
    errors.push({ field: 'color', message: 'Color must be a valid hex color' });
  }

  return errors;
};

export const validateRow = (row: Partial<TimelineRow>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!row.id || row.id.trim() === '') {
    errors.push({ field: 'id', message: 'Row ID is required' });
  }

  if (!row.label || row.label.trim() === '') {
    errors.push({ field: 'label', message: 'Row label is required' });
  }

  return errors;
};

export const isValidHexColor = (color: string): boolean => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(color);
};

export const sanitizeTaskTitle = (title: string): string => {
  return title.trim().replace(/[<>]/g, '');
};

export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  return startDate < endDate;
};

export const validateTaskDependencies = (
  taskId: string,
  dependencies: string[],
  allTasks: Record<string, TimelineTask>
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check if dependencies exist
  dependencies.forEach(depId => {
    if (!allTasks[depId]) {
      errors.push({
        field: 'dependencies',
        message: `Dependency task '${depId}' does not exist`
      });
    }
  });

  // Check for self-dependency
  if (dependencies.includes(taskId)) {
    errors.push({
      field: 'dependencies',
      message: 'Task cannot depend on itself'
    });
  }

  // Check for logical date conflicts
  const task = allTasks[taskId];
  if (task) {
    dependencies.forEach(depId => {
      const depTask = allTasks[depId];
      if (depTask && depTask.endDate > task.startDate) {
        errors.push({
          field: 'dependencies',
          message: `Task cannot start before dependency '${depTask.title}' ends`
        });
      }
    });
  }

  return errors;
};

export const isValidTimelineData = (
  rows: TimelineRow[],
  tasks: Record<string, TimelineTask>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate rows
  rows.forEach((row, index) => {
    const rowErrors = validateRow(row);
    if (rowErrors.length > 0) {
      errors.push(`Row ${index + 1}: ${rowErrors.map(e => e.message).join(', ')}`);
    }
  });

  // Validate tasks
  Object.values(tasks).forEach(task => {
    const taskErrors = validateTask(task);
    if (taskErrors.length > 0) {
      errors.push(`Task '${task.title}': ${taskErrors.map(e => e.message).join(', ')}`);
    }
  });

  // Check if all task rowIds exist
  const rowIds = new Set(rows.map(row => row.id));
  Object.values(tasks).forEach(task => {
    if (!rowIds.has(task.rowId)) {
      errors.push(`Task '${task.title}' references non-existent row '${task.rowId}'`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};