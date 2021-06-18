import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(url);
        const data = res.data;
        setData(data);
      } catch (err) {
        setError(err.message);
      }
    }
    getData();
  }, [url]);

  return [data, error];
};

export default useFetch;
