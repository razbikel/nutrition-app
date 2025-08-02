export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getTodayString = (): string => {
  return formatDate(new Date());
};

export const getDateOffset = (dateStr: string, offset: number): string => {
  const date = new Date(dateStr + 'T00:00:00');
  date.setDate(date.getDate() + offset);
  return formatDate(date);
};