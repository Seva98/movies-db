export const randomGuid = function(): string {
  const buf: Array<number> = Array.from({ length: 4 }, () => Math.floor(Math.random() * 1000000000));
  let idx = -1;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    idx++;
    const r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
