import { useEffect, useState } from 'react';

const key = import.meta.env.VITE_RAWG;

export default function useUrlFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlWithKey = url.includes('?')
      ? `${url}&key=${key}`
      : `${url}?key=${key}`;
    setLoading(true);
    fetch(urlWithKey)
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
  }, [url]);

  return [data, loading, error];
}
