import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const [firstData, setFirstData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(url);
        const data = res.data.slice(0, 100);
        setData(data);
        setFirstData(data[0]);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [url]);

  return [data, firstData];
};

export default useFetch;
