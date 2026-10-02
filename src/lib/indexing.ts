export function indexingEnabled(site: URL | undefined): boolean {
  return (
    import.meta.env.PUBLIC_ENABLE_INDEXING === 'true' &&
    site?.protocol === 'https:' &&
    !['localhost', 'example.org'].includes(site.hostname)
  );
}
