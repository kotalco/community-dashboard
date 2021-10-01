export function sortByDate<T extends { createdAt: string }>(arr?: T[]) {
  if (!arr) {
    return [];
  }

  return arr.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
