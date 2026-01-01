import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap-custom.css"; // <-- custom styling

export default function HeatmapExample() {
  return (
    <div className="bg-[#121212] p-3 pb-0 rounded-3xl border border-gray-700/40 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">Activity Heatmap</h2>

      <CalendarHeatmap
        startDate={new Date("2024-01-01")}
        endDate={new Date("2024-12-31")}
        values={[
          { date: "2024-01-01", count: 1 },
          { date: "2024-01-02", count: 3 },
          { date: "2024-01-03", count: 5 },
          { date: "2024-01-10", count: 2 },
          { date: "2024-01-12", count: 7 },   
        ]}
        classForValue={(val) => {
          if (!val || val.count === 0) return "heat-level-0";
          if (val.count <= 2) return "heat-level-1";
          if (val.count <= 4) return "heat-level-2";
          if (val.count <= 6) return "heat-level-3";
          return "heat-level-4";
        }}
        tooltipDataAttrs={(val) => ({
          "data-tip": `${val.date} → ${val.count || 0} activities`,
        })}
        showWeekdayLabels={true}
      />
    </div>
  );
}
