import { useState, useEffect } from 'react';

// API
import apiSettings from '../API';

// Helpers
import { isPersistedState } from '../helpers';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);

        const movie = await apiSettings.fetchMovie(movieId);
        const credits = await apiSettings.fetchCredits(movieId);
        // Get directors only
        const directors = credits.crew.filter(
          (member) => member.job === 'Director'
        );

        setState({
          ...movie,
          actors: credits.cast,
          directors, // same as directors: directors becasuse of ES6
        });
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    if (isPersistedState(movieId)) {
      setState(isPersistedState(movieId));
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  // Write to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
