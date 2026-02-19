import WaitingQ1 from "./WaitingQ1.jsx";
import WaitingQ3 from "./WaitingQ3.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context";
import { demoQueueData } from "../../demo/demoData";

export default function WaitingQueues() {
  const { isDemo } = useAuth();
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    getData();
  }, [isDemo]);

  const safeData = Array.isArray(data) ? data : [];
  const q1 = safeData.filter((item) => item.queue === "Q1").length;
  const q3 = safeData.filter((item) => item.queue === "Q3").length;
  const totalWaiting = q1 + q3;

  return (
    <div className="w-full min-h-screen text-white px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111111] to-[#161616] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                Revision Pipeline
              </p>
              <h1 className="text-3xl sm:text-4xl font-semibold mt-2">
                Waiting Queues
              </h1>
              <p className="text-zinc-400 mt-2 text-sm">
                Questions resting before the next revision move.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl border border-purple-500/25 bg-purple-500/10 px-4 py-3">
                <p className="text-xs text-purple-200/80">Buffer 1</p>
                <p className="text-2xl font-semibold text-purple-300">{q1}</p>
              </div>
              <div className="rounded-2xl border border-indigo-500/25 bg-indigo-500/10 px-4 py-3">
                <p className="text-xs text-indigo-200/80">Buffer 2</p>
                <p className="text-2xl font-semibold text-indigo-300">{q3}</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <p className="text-xs text-zinc-400">Total Waiting</p>
                <p className="text-2xl font-semibold">{totalWaiting}</p>
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
            <WaitingQ1 data={data} />
            <WaitingQ3 data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
