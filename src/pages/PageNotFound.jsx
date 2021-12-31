import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function PageNotFound() {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1);
      if (time === 0) {
        navigate("/", { replace: true });
      }
    }, 1000);
  }, [time, navigate]);
  return (
    <div className='bg-gray-700 h-screen flex flex-col items-center justify-center text-8xl font-bold'>
      <div className='text-red-600'>404</div>
      <div className='text-4xl text-white'>Page Not Found</div>
      <div className='text-4xl text-white'>
        Redirecting to home page in {time} sec
      </div>
    </div>
  );
}

export default PageNotFound;
