

import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMG_BASE } from '../utils/constants';

/**

 *
 * @param {string} path - The image path from TMDB (e.g., '/abc123.jpg')
 * @param {string} size - Image size ('w92', 'w185', 'w342', 'w500', 'original')
 * @returns {string|null} 
 */
export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `${TMDB_IMG_BASE}/${size}${path}`;
}

/**
 * Get the full URL for a movie backdrop image.
 *
 * @param {string} path - The backdrop path from TMDB
 * @param {string} size - Image size (default: 'original')
 * @returns {string|null} Full backdrop URL or null
 */
export function getBackdropUrl(path, size = 'original') {
  if (!path) return null;
  return `${TMDB_IMG_BASE}/${size}${path}`;
}



/**

 *
 * @param {string} endpoint - The API endpoint (e.g., '/trending/movie/week')
 * @param {object} params - Additional query parameters
 * @returns {Promise<object>} The parsed JSON response
 */
async function fetchTMDB(endpoint, params = {}) {

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  url.searchParams.set('language', 'en-US');


  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  try {
    // fetch() returns a Promise — we await the response
    const response = await fetch(url.toString());

    // Check if the response was successful (status 200-299)
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    // Parse the JSON response body
    return await response.json();
  } catch (error) {
    console.error('TMDB fetch error:', error);
    throw error; // Re-throw so the component can handle it
  }
}



export function getTrending(mediaType = 'movie', timeWindow = 'week') {
  return fetchTMDB(`/trending/${mediaType}/${timeWindow}`);
}


export function getPopular(mediaType = 'movie', page = 1) {
  return fetchTMDB(`/${mediaType}/popular`, { page });
}

/** Get top-rated movies */
export function getTopRated(mediaType = 'movie', page = 1) {
  return fetchTMDB(`/${mediaType}/top_rated`, { page });
}

/** Get movies currently in theaters */
export function getNowPlaying(page = 1) {
  return fetchTMDB('/movie/now_playing', { page });
}

/** Get upcoming movies */
export function getUpcoming(page = 1) {
  return fetchTMDB('/movie/upcoming', { page });
}

/** Get detailed info for a specific movie */
export function getMovieDetails(movieId) {
  return fetchTMDB(`/movie/${movieId}`);
}

/** Get cast and crew for a movie */
export function getMovieCredits(movieId) {
  return fetchTMDB(`/movie/${movieId}/credits`);
}

/** Get videos (trailers) for a movie */
export function getMovieVideos(movieId) {
  return fetchTMDB(`/movie/${movieId}/videos`);
}

/** Get similar movies */
export function getSimilarMovies(movieId) {
  return fetchTMDB(`/movie/${movieId}/similar`);
}

/** Search for movies by query text */
export function searchMovies(query, page = 1) {
  return fetchTMDB('/search/movie', { query, page });
}

/** Get the list of movie genres */
export function getGenres() {
  return fetchTMDB('/genre/movie/list');
}
