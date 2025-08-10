import React from "react";

const TravelStatsTab = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-sky-700">Total Trips</div>
            <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xs font-semibold">T</div>
          </div>
          <div className="mt-1 text-2xl font-extrabold text-sky-900">{user.stats?.totalTrips ?? 0}</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-emerald-700">Completed</div>
            <div className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-semibold">C</div>
          </div>
          <div className="mt-1 text-2xl font-extrabold text-emerald-900">{user.stats?.completedTrips ?? 0}</div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-amber-700">Total Days</div>
            <div className="h-7 w-7 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-semibold">D</div>
          </div>
          <div className="mt-1 text-2xl font-extrabold text-amber-900">{user.stats?.totalDays ?? 0}</div>
        </div>
        <div className="rounded-xl border border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 to-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-fuchsia-700">Avg Trip Length</div>
            <div className="h-7 w-7 rounded-full bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center text-xs font-semibold">AVG</div>
          </div>
          <div className="mt-1 text-2xl font-extrabold text-fuchsia-900">
            {(() => {
              const t = user.stats?.totalTrips ?? 0;
              const d = user.stats?.totalDays ?? 0;
              return t > 0 ? Math.round(d / t) : 0;
            })()}d
          </div>
        </div>
      </div>

      {/* Monthly trips bar chart (colorful) */}
      <div className="rounded-2xl border border-sky-200 bg-gradient-to-b from-white to-sky-50 p-4">
        <div className="text-sm font-medium text-sky-800 mb-3">Trips per Month</div>
        {(() => {
          const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          const data = user.stats?.monthlyTrips ?? [1,0,2,1,3,2,2,1,0,1,2,1];
          const palette = ["#38bdf8","#34d399","#f59e0b","#e879f9","#60a5fa","#fb7185","#22d3ee","#a3e635","#f97316","#818cf8","#2dd4bf","#f472b6"];
          const max = Math.max(1, ...data);
          return (
            <div className="flex items-end gap-2 h-36">
              {data.map((v, i) => (
                <div key={i} className="flex flex-col items-center justify-end gap-1 flex-1">
                  <div
                    className="w-full rounded-md"
                    style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${palette[i]} 0%, ${palette[i]}33 100%)` }}
                  />
                  <div className="text-[11px] text-gray-600">{months[i]}</div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Interests breakdown (color tags) */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-white to-emerald-50 p-4">
        <div className="text-sm font-medium text-emerald-800 mb-3">Interests Breakdown</div>
        {(() => {
          const interests = user.preferences?.interests ?? [];
          if (!interests.length) return <div className="text-emerald-700/70 text-sm">No interests selected yet.</div>;
          const counts = user.stats?.interestCounts ?? Object.fromEntries(interests.map((i) => [i, 1]));
          const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
          const chips = ["bg-sky-100 text-sky-800 border-sky-200","bg-emerald-100 text-emerald-800 border-emerald-200","bg-amber-100 text-amber-800 border-amber-200","bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200","bg-indigo-100 text-indigo-800 border-indigo-200","bg-rose-100 text-rose-800 border-rose-200"];
          return (
            <div className="flex flex-wrap gap-2">
              {Object.entries(counts).map(([name, val], idx) => (
                <div key={name} className={`px-3 py-1 rounded-full border text-sm ${chips[idx % chips.length]} flex items-center gap-2`}>
                  <span className="h-2 w-2 rounded-full bg-current opacity-60"></span>
                  <span className="font-medium capitalize">{name}</span>
                  <span className="opacity-70">{Math.round((Number(val) / total) * 100)}%</span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Top destinations */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-b from-white to-amber-50 p-4">
        <div className="text-sm font-medium text-amber-800 mb-3">Top Destinations</div>
        {(() => {
          const tops = user.stats?.topDestinations ?? [];
          if (!tops.length) return <div className="text-amber-700/70 text-sm">No trip history yet.</div>;
          return (
            <ul className="divide-y divide-amber-200">
              {tops.slice(0,5).map((d, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between">
                  <span className="text-gray-800 flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ["#38bdf8","#34d399","#f59e0b","#e879f9","#60a5fa"][idx % 5] }}></span>
                    {d.name ?? d}
                  </span>
                  {d.count != null && (
                    <span className="text-xs text-gray-600 bg-white/70 border border-amber-200 px-2 py-0.5 rounded-full">{d.count} visits</span>
                  )}
                </li>
              ))}
            </ul>
          );
        })()}
      </div>
    </div>
  );
};

export default TravelStatsTab;
