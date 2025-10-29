/**
 * Date utility functions - built from scratch as per requirements
 * No external date libraries allowed
 */

export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: format === 'short' ? 'numeric' : '2-digit',
    month: format === 'short' ? 'short' : 'short',
    year: format === 'long' ? 'numeric' : undefined,
  };
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  return date.toLocaleDateString('en-US', options);
};

export const formatDateForWeekView = (date: Date): string => {
  const weekNumber = getWeekNumber(date);
  return `Week ${weekNumber}`;
};

export const formatDateForMonthView = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const formatDateForDayView = (date: Date): string => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();
  return `${dayName} ${dayNumber}`;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addWeeks = (date: Date, weeks: number): Date => {
  return addDays(date, weeks * 7);
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const startOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const dayOfWeek = result.getDay();
  const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Monday start
  result.setDate(result.getDate() + diff);
  return startOfDay(result);
};

export const endOfWeek = (date: Date): Date => {
  const result = startOfWeek(date);
  result.setDate(result.getDate() + 6);
  return endOfDay(result);
};

export const startOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(1);
  return startOfDay(result);
};

export const endOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  return endOfDay(result);
};

export const differenceInDays = (dateLeft: Date, dateRight: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const utcLeft = Date.UTC(dateLeft.getFullYear(), dateLeft.getMonth(), dateLeft.getDate());
  const utcRight = Date.UTC(dateRight.getFullYear(), dateRight.getMonth(), dateRight.getDate());
  
  return Math.floor((utcLeft - utcRight) / msPerDay);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isSameDay = (dateLeft: Date, dateRight: Date): boolean => {
  return (
    dateLeft.getDate() === dateRight.getDate() &&
    dateLeft.getMonth() === dateRight.getMonth() &&
    dateLeft.getFullYear() === dateRight.getFullYear()
  );
};

export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const clampDate = (date: Date, min: Date, max: Date): Date => {
  if (date < min) return new Date(min);
  if (date > max) return new Date(max);
  return new Date(date);
};

export const generateDateRange = (start: Date, end: Date, increment: 'day' | 'week' | 'month'): Date[] => {
  const dates: Date[] = [];
  const current = new Date(start);
  
  while (current <= end) {
    dates.push(new Date(current));
    
    if (increment === 'day') {
      current.setDate(current.getDate() + 1);
    } else if (increment === 'week') {
      current.setDate(current.getDate() + 7);
    } else if (increment === 'month') {
      current.setMonth(current.getMonth() + 1);
    }
  }
  
  return dates;
};