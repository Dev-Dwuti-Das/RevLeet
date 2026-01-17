
import WaitingQ2 from "./WaitingQ2.jsx";
import { useEffect, useState } from "react";
import WaitingQ4 from "./WaitingQ4.jsx";
import Navbar from "../../components/common/home_nav.jsx";
import axios from "axios";

export default function Working_Queues() {
  const [data, setdata] = useState({});
  async function get_data() {
        try {
          const new_data = await axios.get("http://localhost:3000/api/gethomeinfo", {
            withCredentials: true,
          });
          setdata(new_data.data.user_data);
      
        } catch (err) {
          console.log(err);
        }
      }
    useEffect(() => {
      get_data();
    }, [])
return (
  <div className="w-full min-h-screen text-white">

 
    {/* PAGE CONTENT */}
    <div className="flex justify-center py-12 px-6">
      <div className="w-full max-w-6xl">

        <h1 className="text-center text-3xl mb-10 font-semibold tracking-wide">
          My Queues
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
          <WaitingQ2 data={data} ondone={get_data} />
          <WaitingQ4 data={data} ondone={get_data} />
        </div>

      </div>
    </div>
  </div>
);
}
