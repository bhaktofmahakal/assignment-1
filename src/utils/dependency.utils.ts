import type { TimelineTask } from '@/types/timeline.types';
import { calculatePosition, calculateDuration } from './position.utils';

export interface DependencyLine {
  id: string;
  fromTaskId: string;
  toTaskId: string;
  path: string;
  color: string;
}

export interface Point {
  x: number;
  y: number;
}

export const calculateDependencyLines = (
  tasks: Record<string, TimelineTask>,
  timelineStart: Date,
  pixelsPerDay: number,
  rowHeight: number,
  getRowIndex: (rowId: string) => number
): DependencyLine[] => {
  const lines: DependencyLine[] = [];

  Object.values(tasks).forEach(task => {
    if (task.dependencies && task.dependencies.length > 0) {
      task.dependencies.forEach(dependencyId => {
        const fromTask = tasks[dependencyId];
        if (!fromTask) return;

        const line = createDependencyLine(
          fromTask,
          task,
          timelineStart,
          pixelsPerDay,
          rowHeight,
          getRowIndex
        );

        if (line) {
          lines.push(line);
        }
      });
    }
  });

  return lines;
};

const createDependencyLine = (
  fromTask: TimelineTask,
  toTask: TimelineTask,
  timelineStart: Date,
  pixelsPerDay: number,
  rowHeight: number,
  getRowIndex: (rowId: string) => number
): DependencyLine | null => {
  const fromRowIndex = getRowIndex(fromTask.rowId);
  const toRowIndex = getRowIndex(toTask.rowId);

  if (fromRowIndex === -1 || toRowIndex === -1) return null;

  // Calculate positions
  const fromX = calculatePosition(fromTask.endDate, timelineStart, pixelsPerDay) + 
                calculateDuration(fromTask.startDate, fromTask.endDate, pixelsPerDay);
  const fromY = fromRowIndex * rowHeight + rowHeight / 2;

  const toX = calculatePosition(toTask.startDate, timelineStart, pixelsPerDay);
  const toY = toRowIndex * rowHeight + rowHeight / 2;

  // Create path with right angles (Manhattan routing)
  const path = createManhattanPath({ x: fromX, y: fromY }, { x: toX, y: toY });

  return {
    id: `${fromTask.id}-${toTask.id}`,
    fromTaskId: fromTask.id,
    toTaskId: toTask.id,
    path,
    color: '#94a3b8' // neutral-400
  };
};

const createManhattanPath = (from: Point, to: Point): string => {
  const midX = from.x + (to.x - from.x) * 0.5;
  const arrowSize = 6;

  // Create a path with right angles
  let path = `M ${from.x} ${from.y}`;
  
  if (Math.abs(to.y - from.y) < 5) {
    // Same row or very close rows - direct horizontal line
    path += ` L ${to.x - arrowSize} ${to.y}`;
  } else {
    // Different rows - use Manhattan routing
    path += ` L ${midX} ${from.y}`;
    path += ` L ${midX} ${to.y}`;
    path += ` L ${to.x - arrowSize} ${to.y}`;
  }

  return path;
};

export const findTasksInDependencyChain = (
  taskId: string,
  tasks: Record<string, TimelineTask>
): { predecessors: string[]; successors: string[] } => {
  const predecessors = new Set<string>();
  const successors = new Set<string>();

  // Find all predecessors (tasks this task depends on)
  const findPredecessors = (currentTaskId: string, visited = new Set<string>()) => {
    if (visited.has(currentTaskId)) return; // Prevent circular dependencies
    visited.add(currentTaskId);

    const task = tasks[currentTaskId];
    if (task?.dependencies) {
      task.dependencies.forEach(depId => {
        if (tasks[depId]) {
          predecessors.add(depId);
          findPredecessors(depId, visited);
        }
      });
    }
  };

  // Find all successors (tasks that depend on this task)
  const findSuccessors = (currentTaskId: string, visited = new Set<string>()) => {
    if (visited.has(currentTaskId)) return;
    visited.add(currentTaskId);

    Object.values(tasks).forEach(task => {
      if (task.dependencies?.includes(currentTaskId)) {
        successors.add(task.id);
        findSuccessors(task.id, visited);
      }
    });
  };

  findPredecessors(taskId);
  findSuccessors(taskId);

  return {
    predecessors: Array.from(predecessors),
    successors: Array.from(successors)
  };
};

export const validateDependencies = (
  tasks: Record<string, TimelineTask>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check for circular dependencies
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const hasCycle = (taskId: string): boolean => {
    if (recursionStack.has(taskId)) {
      errors.push(`Circular dependency detected involving task ${taskId}`);
      return true;
    }
    if (visited.has(taskId)) return false;

    visited.add(taskId);
    recursionStack.add(taskId);

    const task = tasks[taskId];
    if (task?.dependencies) {
      for (const depId of task.dependencies) {
        if (tasks[depId] && hasCycle(depId)) {
          return true;
        }
      }
    }

    recursionStack.delete(taskId);
    return false;
  };

  // Check all tasks for cycles
  Object.keys(tasks).forEach(taskId => {
    if (!visited.has(taskId)) {
      hasCycle(taskId);
    }
  });

  // Check for invalid dependency references
  Object.values(tasks).forEach(task => {
    if (task.dependencies) {
      task.dependencies.forEach(depId => {
        if (!tasks[depId]) {
          errors.push(`Task ${task.id} references invalid dependency ${depId}`);
        }
      });
    }
  });

  // Check for logical date conflicts
  Object.values(tasks).forEach(task => {
    if (task.dependencies) {
      task.dependencies.forEach(depId => {
        const depTask = tasks[depId];
        if (depTask && depTask.endDate > task.startDate) {
          errors.push(
            `Task ${task.id} starts before its dependency ${depId} ends`
          );
        }
      });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const calculateCriticalPath = (
  tasks: Record<string, TimelineTask>
): string[] => {
  // Simple critical path calculation
  // This is a simplified version - in a real application, you'd use more sophisticated algorithms
  
  const taskList = Object.values(tasks);
  const criticalTasks: string[] = [];
  
  // Find tasks with no successors (end tasks)
  const endTasks = taskList.filter(task => 
    !taskList.some(t => t.dependencies?.includes(task.id))
  );

  // For each end task, trace back to find the longest path
  endTasks.forEach(endTask => {
    const path = findLongestPath(endTask.id, tasks);
    if (path.length > criticalTasks.length) {
      criticalTasks.splice(0, criticalTasks.length, ...path);
    }
  });

  return criticalTasks;
};

const findLongestPath = (
  taskId: string,
  tasks: Record<string, TimelineTask>,
  visited = new Set<string>()
): string[] => {
  if (visited.has(taskId)) return [];
  
  const task = tasks[taskId];
  if (!task) return [];

  visited.add(taskId);
  let longestPath = [taskId];

  if (task.dependencies) {
    let maxPath: string[] = [];
    
    task.dependencies.forEach(depId => {
      const depPath = findLongestPath(depId, tasks, new Set(visited));
      if (depPath.length > maxPath.length) {
        maxPath = depPath;
      }
    });

    longestPath = [...maxPath, taskId];
  }

  return longestPath;
};