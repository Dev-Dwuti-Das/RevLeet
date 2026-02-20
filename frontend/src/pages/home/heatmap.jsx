import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "./heatmap-custom.css";
import { useAuth } from "../../context";

function formatLocalDate(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function HeatmapExample({ data, streak = 0 }) {
  const { isDemo } = useAuth();
  const safeData = Array.isArray(data) ? data : [];

  const map = {};

  if (isDemo && streak > 0) {
    const today = new Date();
    for (let i = 0; i < streak; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      // Generate deterministic intensity so demo streak days are consecutive
      // and rendered with visible green shade variation.
      const intensity = Math.max(1, Math.min(8, streak - i + 1));
      map[formatLocalDate(day)] = intensity;
    }
  } else {
    safeData.forEach((item) => {
      if (!item.isDone || !item.queueEnteredAt) return;

      const date = formatLocalDate(new Date(item.queueEnteredAt));
      map[date] = (map[date] || 0) + 1;
    });
  }

  const values = Object.entries(map).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="bg-[#121212] p-3 pb-0 rounded-3xl border border-gray-700/40 shadow-xl overflow-hidden">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Activity Heatmap
      </h2>

      <div className="overflow-x-auto">
        <CalendarHeatmap
          startDate={new Date("2025-02-01")}
          endDate={new Date()}
          values={values}
          classForValue={(val) => {
            if (!val || val.count === 0) return "heat-level-0";
            if (val.count <= 2) return "heat-level-1";
            if (val.count <= 4) return "heat-level-2";
            if (val.count <= 6) return "heat-level-3";
            return "heat-level-4";
          }}
          tooltipDataAttrs={(val) => ({
            "data-tip": `${val?.date} → ${val?.count || 0} activities`,
          })}
          showWeekdayLabels={true}
        />
      </div>
    </div>
  );
}
