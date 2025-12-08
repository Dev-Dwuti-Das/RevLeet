import React from "react";

const QUEUE_LABELS = [
  { key: "clueless", label: "Clueless", color: "text-red-500" },
  { key: "vague", label: "Vague", color: "text-orange-500" },
  { key: "littleHelp", label: "Almost done", color: "text-yellow-500" },
];

function Queues() {
  const queueData = {
    clueless: [
      { id: 1, title: "Two Sum" },
      { id: 2, title: "Reverse Linked List" },
    ],
    vague: [{ id: 3, title: "Binary Search" }],
    littleHelp: [],
  };

  return (
    <div className="w-full min-h-screen bg-[#111] flex justify-center py-12 px-6 text-white">
      <div className="w-full max-w-6xl">
        
        <h1 className="text-center text-3xl mb-10 font-semibold tracking-wide">
          My Queues
        </h1>

        {/* Responsive grid same as your Home page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {QUEUE_LABELS.map((q) => {
            const count = queueData[q.key].length;

            return (
              <div
                key={q.key}
                className="
                  bg-[#1b1b1b]
                  rounded-2xl
                  border border-gray-300/30
                  p-6 
                  shadow-lg shadow-black/30
                  hover:shadow-xl hover:shadow-black/50
                  transition-all duration-300
                "
              >
                {/* Title */}
                <h2 className="text-2xl font-semibold mb-2">{q.label}</h2>

                {/* Count (highlight color matches type) */}
                <div className={`text-3xl font-bold mb-1 ${q.color}`}>
                  {count > 0 ? `${count} questions` : "No questions"}
                </div>

                <p className="text-gray-400 text-sm mb-6">time remaining</p>

                {/* Questions list */}
                <div className="space-y-3">
                  {count === 0 && (
                    <div className="text-gray-500 text-sm italic">
                      empty queue
                    </div>
                  )}

                  {queueData[q.key].map((item) => (
                    <div
                      key={item.id}
                      className="
                        bg-[#262626] 
                        py-2 px-4 
                        rounded-xl 
                        border border-gray-700/40
                        text-sm cursor-pointer
                        hover:bg-[#303030] 
                        transition
                      "
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default Queues;
