import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTravelJourneys = (routeScheduleId, journeyDate, security) => {
  const [travelJourneys, setTravelJourneys] = useState([]);

  useEffect(() => {
    // console.log("useGetTravelJourneys hook called");
    const fetchTravelJourneys = async () => {
      try {
        const response = await API.getSearchedJourneys(routeScheduleId, journeyDate, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setTravelJourneys(res.data);
          // console.log('Fetched travelJourneys: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
          // console.log('TravelJourneys Empty: ', res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch travelJourneys error: ', error);
      }
    };

    fetchTravelJourneys();
  }, [routeScheduleId, journeyDate, security]);

  return { travelJourneys };
};

export default useGetTravelJourneys;
