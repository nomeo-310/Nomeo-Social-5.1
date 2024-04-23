import { formatDistance, formatRelative } from 'date-fns';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getDateFormat = (timestamp:string) => {

  const fullDate = new Date(timestamp);
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();

  return `${date} ${month}`
}

export const getFullDateFormat = (timestamp:string) => {

  const fullDate = new Date(timestamp);
  const year = fullDate.getFullYear();
  const month = months[fullDate.getMonth()];
  const date = fullDate.getDate();

  return `${date} ${month} ${year}`
}

export const getTimeFormat = (timestamp:string) => {
  const then = new Date(timestamp);
  const now = new Date();
  const distance = formatDistance(then, now, { addSuffix: true });
  const relativeTime = formatRelative(then, now);
  
  return { distance, relativeTime }
}