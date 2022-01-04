import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useFetchData = (url, token, type, id) => {
  const [isLoading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (type === "get") {
          const res = await axios.get(url, {
            headers: { token: `Bearer ${token}` },
          });
          setApiData(res.data);
          setLoading(false);
        } else if (type === "post") {
          const myId = {
            userId: id,
          };
          const res = await axios.post(url, myId, {
            headers: { token: `Bearer ${token}` },
          });
          setApiData(res.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { isLoading, apiData, serverError };
};

export default useFetchData;
