import React from 'react'


const QUEUE_LABELS = [
  { key: "clueless", label: "clueless", color: "text-red-400" },
  { key: "vague", label: "vague", color: "text-orange-400" },
  { key: "littleHelp", label: "little help", color: "text-yellow-300" },
];

function Queues() {
     const queueData = {
    clueless: [
      { id: 1, title: "Two Sum" },
      { id: 2, title: "Reverse Linked List" },
    ],
    vague: [
      { id: 3, title: "Binary Search" },
    ],
    littleHelp: [],
  };
    return (
    <div className="w-full min-h-screen bg-[#111] flex justify-center py-12 px-6 text-white">
      <div className="w-full max-w-6xl">
        
        <h1 className="text-center text-3xl mb-8 font-semibold tracking-wide">
          My Queues
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {QUEUE_LABELS.map((q) => (
            <div
              key={q.key}
              className="
                bg-[#1b1b1b] rounded-2xl border border-gray-700/50
                p-4 flex flex-col 
                shadow-lg shadow-black/30
                hover:shadow-xl hover:shadow-black/50 
                transition-all duration-300
              "
            >
              
              <h2 className={`text-xl font-semibold mb-3 ${q.color}`}>
                {q.label}
              </h2>

              
              <div className="space-y-2">
                {queueData[q.key].length === 0 && (
                  <div className="text-gray-500 text-sm italic">
                    empty queue
                  </div>
                )}

                {queueData[q.key].map((item) => (
                  <div
                    key={item.id}
                    className="
                      bg-[#262626] py-2 px-3 rounded-xl 
                      border border-gray-700/50 
                      text-sm cursor-pointer
                      hover:bg-[#303030] transition
                    "
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>)
}

export default Queues;


