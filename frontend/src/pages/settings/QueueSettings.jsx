import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../context.jsx";
import { DEFAULT_BUFFER_SETTINGS, formatDuration } from "../../utils/queueSettings.js";

export default function QueueSettings() {
  const { isDemo } = useAuth();
  const [form, setForm] = useState(DEFAULT_BUFFER_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [readOnly, setReadOnly] = useState(isDemo);

  useEffect(() => {
    async function loadSettings() {
      if (isDemo) {
        setReadOnly(true);
        setForm(DEFAULT_BUFFER_SETTINGS);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/queue-settings", {
          withCredentials: true,
        });
        setForm(res.data?.settings || DEFAULT_BUFFER_SETTINGS);
        setReadOnly(Boolean(res.data?.readOnly));
      } catch (err) {
        console.error("Queue settings fetch failed:", err);
        toast.error("Could not load queue settings");
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [isDemo]);

  const onChange = (key) => (event) => {
    setForm((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (readOnly) {
      toast.info("Demo mode is read-only");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        Q1Days: Number(form.Q1Days),
        Q3Days: Number(form.Q3Days),
      };
      const res = await axios.put("/api/queue-settings", payload, {
        withCredentials: true,
      });
      setForm(res.data?.settings || payload);
      toast.success("Queue settings saved");
    } catch (err) {
      console.error("Queue settings update failed:", err);
      toast.error(err?.response?.data?.msg || "Could not save queue settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#111111] p-6 text-zinc-400">
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.2),_transparent_35%),linear-gradient(135deg,#131117,#0b0b0d)] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Queue Controls
              </p>
              <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Buffer Timing Settings
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Configure how long questions stay in Buffer 1 and Buffer 2 before they move to the next revision stage.
              </p>
            </div>
            <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${
              readOnly
                ? "border-amber-400/30 bg-amber-500/10 text-amber-200"
                : "border-emerald-400/30 bg-emerald-500/10 text-emerald-200"
            }`}>
              {readOnly ? "Read-only" : "Editable"}
            </span>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <div className="grid gap-6">
              <label className="rounded-3xl border border-purple-500/20 bg-purple-500/5 p-5">
                <span className="block text-sm font-semibold text-purple-200">Buffer 1</span>
                <span className="mt-1 block text-sm text-zinc-400">Time in days before a solved item moves from Q1 to Q2.</span>
                <input
                  type="number"
                  min="1"
                  max="150"
                  step="1"
                  value={form.Q1Days}
                  onChange={onChange("Q1Days")}
                  disabled={readOnly || saving}
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-purple-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-purple-300/80">
                  Current: {formatDuration(form.Q1Days)}
                </span>
              </label>

              <label className="rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-5">
                <span className="block text-sm font-semibold text-indigo-200">Buffer 2</span>
                <span className="mt-1 block text-sm text-zinc-400">Time in days before a solved item moves from Q3 to Q4.</span>
                <input
                  type="number"
                  min="1"
                  max="150"
                  step="1"
                  value={form.Q3Days}
                  onChange={onChange("Q3Days")}
                  disabled={readOnly || saving}
                  className="mt-4 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-lg font-semibold text-white outline-none transition focus:border-indigo-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-indigo-300/80">
                  Current: {formatDuration(form.Q3Days)}
                </span>
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={readOnly || saving}
                className="rounded-full border border-purple-400/30 bg-purple-500/15 px-5 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save settings"}
              </button>
              <p className="text-sm text-zinc-500">
                Existing waiting items are recalculated from their queue entry time after save. Allowed range: 1 to 150 days.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-[#111111] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Preview</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-purple-400/20 bg-purple-500/10 p-5">
                <p className="text-sm font-semibold text-purple-200">Q1 -&gt; Q2</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatDuration(form.Q1Days)}</p>
              </div>
              <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-5">
                <p className="text-sm font-semibold text-indigo-200">Q3 -&gt; Q4</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatDuration(form.Q3Days)}</p>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
