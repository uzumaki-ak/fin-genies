import { useState } from "react";
import { toast } from "sonner";

// Fetch data with a timeout cb her is calbck whn cerate ac clkd these 3 fun will run 
const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // to reuse fun again and agn we mande fn func
  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    // taking extra arg from cb jic

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn, setData };
};

export default useFetch;