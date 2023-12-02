import { useContext, useEffect, useState } from 'react';
import CacheContext from '../contexts/CacheContext';

const key = import.meta.env.VITE_RAWG;

export default function useRawgFetch(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheRef = useContext(CacheContext);

  const baseUrl = 'https://api.rawg.io/api/games';
  const suffix = id ? `/${id}?key=${key}` : `?key=${key}&platforms=79&stores=6`;
  const fullUrl = baseUrl + suffix;

  useEffect(() => {
    setLoading(true);

    if (cacheRef.current[fullUrl]) {
      setData(cacheRef.current[fullUrl]);
      setError(null);
      setLoading(false);
      return;
    }

    fetch(fullUrl)
      .then((res) => {
        if (res.status > 200) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((fetchedData) => {
        cacheRef.current[fullUrl] = fetchedData;
        setData(fetchedData);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fullUrl, cacheRef]);

  return [data, loading, error];
}
