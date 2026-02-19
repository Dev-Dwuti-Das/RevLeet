import WaitingQ2 from "./WaitingQ2.jsx";
import { useEffect, useState } from "react";
import WaitingQ4 from "./WaitingQ4.jsx";
import axios from "axios";
import { useAuth } from "../../context";
import { demoQueueData } from "../../demo/demoData";

export default function Working_Queues() {
  const { isDemo } = useAuth();
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    if (isDemo) {
      setdata(demoQueueData);
      setLoading(false);
      return;
    }
    try {
      const new_data = await axios.get("/api/gethomeinfo", {
        withCredentials: true,
      });
      setdata(new_data.data.user_data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [isDemo]);

  const safeData = Array.isArray(data) ? data : [];
  const q2 = safeData.filter((item) => item.queue === "Q2").length;
  const q4 = safeData.filter((item) => item.queue === "Q4").length;
  const totalActionable = q2 + q4;

  return (
    <div className="w-full min-h-screen text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] to-[#161616] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Active Revision
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold mt-2">
                Working Queues
              </h1>
              <p className="text-zinc-400 mt-2 text-sm">
                Questions ready for manual review and completion.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl border border-orange-500/25 bg-orange-500/10 px-4 py-3">
                <p className="text-xs text-orange-200/80">Warm</p>
                <p className="text-2xl font-semibold text-orange-300">{q2}</p>
              </div>
              <div className="rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-4 py-3">
                <p className="text-xs text-yellow-200/80">Almost done</p>
                <p className="text-2xl font-semibold text-yellow-300">{q4}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <p className="text-xs text-zinc-400">Total Actionable</p>
                <p className="text-2xl font-semibold">{totalActionable}</p>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 text-zinc-400">
            Loading queue data...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <WaitingQ2 data={data} ondone={getData} />
            <WaitingQ4 data={data} ondone={getData} />
          </div>
        )}
      </div>
    </div>
  );
}
