import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetDates = (routeScheduleId, security) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // console.log("useGetDates hook called");
    const fetchDates = async () => {
      try {
        const response = await API.getDates(routeScheduleId, security);
        const statusCode = response[0];
        const res = response[1];
        // console.log('API response: ', res);
        const status = response[2];

        if (status) {
          setDates(res.data);
        //   console.log('Fetched dates: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
        //   console.log('Dates Empty: ', res.message);
        }
      } catch (error) {
        toast.error(error.message);
        // console.error('Fetch dates error: ', error);
      }
    };

    fetchDates();
  }, [routeScheduleId, security]);

  return { dates };
};

export default useGetDates;
