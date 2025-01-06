const calculateFlashMem = (statvfs: number[]): [number, number, number] => {
    if (statvfs.length != 10) {
      throw new Error('Invalid data provided');
    }
  
    const [_, f_frsize, f_blocks, f_bfree] = statvfs;
  
    const total = f_blocks * f_frsize;
    const used = (f_blocks - f_bfree) * f_frsize;
    const free = f_bfree * f_frsize;
  
    return [total, free, used];
  };

export default calculateFlashMem;