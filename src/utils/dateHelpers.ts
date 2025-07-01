/**
 * Date utility functions for handling date formatting with proper timezone handling
 * Backend sends dates in local timezone, so we need to avoid UTC conversion
 */

/**
 * Parse date string as local time (avoiding timezone conversion)
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns Date object in local time
 */
export const parseLocalDate = (dateString: string): Date => {
  // Extract just the date part if it's an ISO string
  const dateOnly = dateString.includes('T') ? dateString.split('T')[0] : dateString;
  const dateParts = dateOnly.split('-');
  return new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
};

/**
 * Format date for chart display (e.g., "Jul 1")
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns Formatted date string
 */
export const formatDateForChart = (dateString: string): string => {
  const localDate = parseLocalDate(dateString);
  return localDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * Format date for table display (e.g., "Jul 1, 2025")
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns Formatted date string
 */
export const formatDateForTable = (dateString: string): string => {
  const localDate = parseLocalDate(dateString);
  return localDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format date for display with full month name (e.g., "July 1, 2025")
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns Formatted date string
 */
export const formatDateFull = (dateString: string): string => {
  const localDate = parseLocalDate(dateString);
  return localDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Format date for ISO display (e.g., "2025-07-01")
 * @param dateString - Date string in format "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns ISO formatted date string (YYYY-MM-DD)
 */
export const formatDateISO = (dateString: string): string => {
  return dateString.includes('T') ? dateString.split('T')[0] : dateString;
}; 