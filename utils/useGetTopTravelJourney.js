import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "./fetcher";

const useGetTopTravelJourneys = (security) => {
  const [allTopTravelJourneys, setTopTravelJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopTravelJourneys = async () => {
      setLoading(true);
      try {
        const response = await API.getTopTravelJourneys(security);
        const statusCode = response[0];
        const res = response[1];
        const status = response[2];

        if (status) {
          // console.log("useGetTopTopTravelJourneys hook called");

          setTopTravelJourneys(res.data);
          // console.log('Fetched travelJourneys: ', res.data);
        } else if (statusCode === 404) {
          toast.error(res.message);
          // console.log('TopTravelJourneys Empty: ', res.message);
        }
      } catch (error) {
        // toast.error(error.message);
        // console.error('Fetch travelJourneys error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTravelJourneys();
  }, [security]);

  return { allTopTravelJourneys, loading };
};

export default useGetTopTravelJourneys;
