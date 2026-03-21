// Module-level cache for ASCII frames - shared across all instances
// Rule: js-cache-function-results
let framesCache: string[][] | null = null;
let fetchPromise: Promise<string[][]> | null = null;

export async function fetchAsciiFrames(): Promise<string[][]> {
  // Return cached data if available
  if (framesCache) return framesCache;

  // Return existing promise if fetch is in progress (deduplication)
  if (fetchPromise) return fetchPromise;

  // Fetch and cache
  fetchPromise = fetch("/ascii-frames (2).json")
    .then((res) => res.json())
    .then((data) => {
      framesCache = data;
      return data;
    })
    .catch(() => [["  Loading...  "]]);

  return fetchPromise;
}
