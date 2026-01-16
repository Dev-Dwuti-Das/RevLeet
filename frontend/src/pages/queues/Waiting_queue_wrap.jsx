import WaitingQ1 from "./WaitingQ1.jsx";
import WaitingQ3 from "./WaitingQ3.jsx";
import { useState, useEffect } from "react";5
import axios from "axios";
import Navbar from "../../components/common/home_nav.jsx";

export default function WaitingQueues() {
  const [data, setdata] = useState({});

  useEffect(() => {
    async function get_data() {
      try {
        const new_data = await axios.get(
          "http://localhost:3000/api/gethomeinfo",
          { withCredentials: true }
        );
        setdata(new_data.data.user_data);
      } catch (err) {
        console.log(err);
      }
    }

    get_data();
  }, []);

  return (
    <div className="w-full min-h-screen text-white">


   
      <div className="flex justify-center py-12 px-6">
        <div className="w-full max-w-6xl">

          <h1 className="text-center text-3xl mb-10 font-semibold tracking-wide">
            My Queues
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
            <WaitingQ1 data={data} />
            <WaitingQ3 data={data} />
          </div>

        </div>
      </div>
    </div>
  );
}
