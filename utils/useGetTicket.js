import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTickets = (security) => {
  const [allTickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await API.getAllTickets(security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setTickets(res.data);
        //   console.log('Fetched tickets: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [security]);

  return { allTickets, loading };
};

export default useGetTickets;
