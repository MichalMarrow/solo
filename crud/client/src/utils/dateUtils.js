// utils/dateUtils.js
export const formatDate = (date) => {
  const d = new Date(date);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const time = `${hours}:${minutes} ${ampm}`;
  const dateStr = d.toISOString().split('T')[0];
  return `${dateStr} ${time}`;
};
