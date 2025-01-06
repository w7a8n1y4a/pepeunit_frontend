function formatMillis(time: number): string {
    const formatDate = (timestamp: number): string => {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ` +
             `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    };
  
    const formatUptime = (milliseconds: number): string => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      return `${days}d ${hours % 24}:${minutes % 60}:${seconds % 60}`;
    };
  
    const isUnixTimestamp = time > 1000000000000;
  
    return isUnixTimestamp ? formatDate(time) : formatUptime(time);
  }
  
export default formatMillis;