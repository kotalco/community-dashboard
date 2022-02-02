export const getMigaOrKiloBit = (bytes = 0) => {
  let unit = 'Bit/s';
  let rate = bytes * 8;

  if (rate >= 800) {
    unit = 'KiB/s';
    rate = rate / 1000;

    if (rate >= 800) {
      unit = 'MiB/s';
      rate = rate / 1000;
    }
  }

  return `${rate.toFixed(2)} ${unit}`;
};
