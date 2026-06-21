import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLinks from "../../hooks/useLinks";

const BarChart = ({ data }) => {
  // data: [{label, value}]
  const max = Math.max(1, ...data.map((d) => d.value));
  const height = 160;
  const paddingTop = 36; // allow space above bars for value labels
  const viewBoxHeight = height + paddingTop;
  const barWidth = Math.max(24, Math.floor(600 / Math.max(1, data.length)) - 8);

  return (
    <svg width="100%" height={viewBoxHeight} viewBox={`0 0 ${data.length * (barWidth + 8)} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 40);
        const x = i * (barWidth + 8);
        const y = viewBoxHeight - h - 30;
        return (
          <g key={i} transform={`translate(${x},0)`}> 
            <rect x={0} y={y} width={barWidth} height={h} rx={6} fill="#6366F1" />
            <text x={barWidth / 2} y={viewBoxHeight - 12} fontSize={12} textAnchor="middle" fill="#374151">{d.label}</text>
            <text x={barWidth / 2} y={Math.max(12, y - 6)} fontSize={12} textAnchor="middle" fill="#111827">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
};

const Analytics = () => {
  const { user } = useSelector((s) => s.auth);
  const username = user?.user?.username || user?.username;
  const { getAnalyticsByUsername } = useLinks();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    (async () => {
      setLoading(true);
      try {
        const res = await getAnalyticsByUsername(username);
        setAnalytics(res || null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);

  const totalClicks = analytics?.totalClicks || 0;
  const totalLinks = analytics?.totalLinks || 0;
  const mostClicked = analytics?.mostClicked || null;

  const chartData = (analytics?.links || []).map((l) => ({ label: l.title.length > 10 ? l.title.slice(0, 10) + "..." : l.title, value: l.totalClicks || 0 }));

  const recent = analytics?.recentActivity || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Total Links</div>
          <div className="text-3xl font-bold">{totalLinks}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500">Total Clicks</div>
          <div className="text-3xl font-bold">{totalClicks}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Most Clicked</div>
            <div className="font-medium mt-2">{mostClicked ? mostClicked.title : "-"}</div>
            <div className="text-sm text-gray-400">{mostClicked ? `${mostClicked.clicks} clicks` : ""}</div>
          </div>
          <div className="text-xs text-gray-400 mt-4">Updated: {mostClicked ? new Date(mostClicked.updatedAt || Date.now()).toLocaleString() : "-"}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-500">Clicks per Link</div>
            <div className="text-xs text-gray-400">Visual overview of how each link performs</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-gray-500 py-6">Loading...</div>
          ) : error ? (
            <div className="text-red-500 py-6">Error loading analytics.</div>
          ) : chartData.length ? (
            <BarChart data={chartData} />
          ) : (
            <div className="text-gray-500 py-6">No data to display.</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500 mb-2">Links Performance</div>
          <div className="space-y-3">
            {(analytics?.links || []).map((l) => (
              <div key={l.id} className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{l.title}</div>
                  <div className="text-xs text-gray-400">{l.url}</div>
                </div>
                <div className="w-32 text-right">
                  <div className="text-sm font-semibold">{l.totalClicks || 0}</div>
                </div>
              </div>
            ))}
            {(analytics?.links || []).length === 0 && <div className="text-gray-500">No links available.</div>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <div className="text-sm text-gray-500 mb-2">Recent Activity</div>
          <div className="space-y-3">
            {recent.map((r, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-400">{new Date(r.lastClickedDate).toLocaleString()}</div>
                </div>
                <div className="text-sm text-gray-500">{r.clicks || 0} clicks</div>
              </div>
            ))}
            {recent.length === 0 && <div className="text-gray-500">No recent activity.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
