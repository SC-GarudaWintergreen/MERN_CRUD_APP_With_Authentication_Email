function epochToLocalTime(epoch) {
  const date = new Date(epoch); 
  return date.toLocaleString(); // Convert to local date-time format
}

export default epochToLocalTime;
