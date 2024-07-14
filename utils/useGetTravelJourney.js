import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTravelJourneys = (routeScheduleId, journeyDate, security) => {
  const [allTravelJourneys, setTravelJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTravelJourneys = async () => {
      setLoading(true);
      try {
        const response = await API.getSearchedJourneys(routeScheduleId, journeyDate, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          setTravelJourneys(res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelJourneys();
  }, [routeScheduleId, journeyDate, security]);

  return { allTravelJourneys, loading };
};

export default useGetTravelJourneys;
