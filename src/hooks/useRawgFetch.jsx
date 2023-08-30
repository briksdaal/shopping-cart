import { useEffect, useState } from 'react';

const key = import.meta.env.VITE_RAWG;

export default function useRawgFetch(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = 'https://api.rawg.io/api/games';
    const addition = id
      ? `/${id}?key=${key}`
      : `?key=${key}&platforms=79&stores=6`;
    const fullUrl = baseUrl + addition;

    setLoading(true);
    fetch(fullUrl)
      .then((res) => {
        if (res.status > 200) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return [data, loading, error];
}
