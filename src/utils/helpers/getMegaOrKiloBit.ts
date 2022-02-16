export const getMigaOrKiloBit = (bytes = 0) => {
  let unit = 'Byte/s';
  let rate = bytes;

  if (rate >= 800) {
    unit = 'KB/s';
    rate = rate / 1024;

    if (rate >= 800) {
      unit = 'MB/s';
      rate = rate / 1024;
    }
  }

  return `${rate.toFixed(2)} ${unit}`;
};
