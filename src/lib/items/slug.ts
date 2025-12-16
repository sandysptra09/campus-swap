export function generateSlug(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const random = Math.random().toString(36).slice(2, 8);

  return `${base}-${random}`;
}
