export function formatDate(dateUTC: string): string {
  const date = new Date(dateUTC);
  return date
    .toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '.');
}
