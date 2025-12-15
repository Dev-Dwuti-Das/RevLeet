import CluelessCard from "./CluelessQ.jsx";
import VagueCard from "./VagueQ.jsx";
import AlmostDoneCard from "./AlmostDoneQ.jsx";
import WaitingQ from "../queues/WaitingQ.jsx";

export default function Queues() {
  return (
    <div className="w-full min-h-screen flex justify-center py-12 px-6 text-white">
      <div className="w-full max-w-6xl">

        <h1 className="text-center text-3xl mb-10 font-semibold tracking-wide">
          My Queues
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-5 gap-8">
          <WaitingQ></WaitingQ>
          <VagueCard />
          <WaitingQ></WaitingQ>
          <AlmostDoneCard />
          <WaitingQ></WaitingQ>
          {/* <CluelessCard></CluelessCard> */}
        </div>

      </div>
    </div>
  );
}
