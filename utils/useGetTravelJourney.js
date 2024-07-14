import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTravelJourneys = (routeScheduleId, journeyDate, security) => {
  const [allTravelJourneys, setTravelJourneys] = useState([]);

  useEffect(() => {
    const fetchTravelJourneys = async () => {
      try {
        const response = await API.getSearchedJourneys(routeScheduleId, journeyDate, security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          // console.log("useGetTravelJourneys hook called");

          setTravelJourneys(res.data);
          // console.log('Fetched travelJourneys: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
          // console.log('TravelJourneys Empty: ', res.message);
        }
      } catch (error) {
        // toast.error(error.message);
        // console.error('Fetch travelJourneys error: ', error);
      }
    };

    fetchTravelJourneys();
  }, [routeScheduleId, journeyDate, security]);

  return { allTravelJourneys };
};

export default useGetTravelJourneys;
