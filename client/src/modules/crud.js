import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState("");
  const [firstData, setFirstData] = useState(null)

  useEffect(() => {
     (async () => {
      try {
        const res = await axios.get(url);
        const data = res.data.data.slice(0,100);
        setData(data);
        setFirstData(data[0])
      } catch (err) {
        setError(err.message);
      }
    })()
   
  }, [url]);

  return [data, firstData];
};

// export const usePost = (url, data) => {
//   const [error, setError] = useState("");

//   useEffect(() => {
//      (async () => {
//       try {
//         await axios.post(url, data);
//       } catch (err) {
//         setError(error.message);
//       }
//     })()
   
//   }, [url]);
// };

export default useFetch;
