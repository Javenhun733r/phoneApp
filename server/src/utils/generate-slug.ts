export function generateSlug(text: string): string {
  if (!text) {
    return '';
  }

  let slug = text.toLowerCase().trim();
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  slug = slug.replace(/[^a-z0-9\s-]/g, ' ');

  slug = slug.replace(/[\s-]+/g, '-');

  return slug;
}
