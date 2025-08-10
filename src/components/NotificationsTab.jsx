import React, { useEffect, useMemo, useState } from "react";
import { getNotifications, seedIfEmpty, markRead, markAllRead, addMockNotification } from "../services/notifications.mock";

const formatTime = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
};

const NotificationsTab = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  async function load() {
    setLoading(true);
    try {
      await seedIfEmpty();
      const data = await getNotifications({ status: statusFilter, limit: 100 });
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleMarkAllRead() {
    await markAllRead();
    await load();
  }

  async function handleMarkRead(id) {
    await markRead([id]);
    await load();
  }

  function handleSimulateNew() {
    addMockNotification({
      type: "system",
      title: "Welcome to Travel Track",
      message: "This is a simulated notification.",
      meta: {},
    });
    load();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Settings removed as requested */}

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-lg text-sm border ${statusFilter === "all" ? "bg-sky-100 text-sky-800 border-sky-300" : "bg-white text-gray-700 border-gray-300"}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1.5 rounded-lg text-sm border ${statusFilter === "unread" ? "bg-sky-100 text-sky-800 border-sky-300" : "bg-white text-gray-700 border-gray-300"}`}
            onClick={() => setStatusFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="px-3 py-1.5 rounded-lg text-sm border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">Refresh</button>
          <button onClick={handleMarkAllRead} className="px-3 py-1.5 rounded-lg text-sm border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">Mark all read</button>
          <button onClick={handleSimulateNew} className="px-3 py-1.5 rounded-lg text-sm border bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white hover:from-fuchsia-600 hover:to-fuchsia-700">Simulate new</button>
        </div>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-sky-100 bg-white">
        {loading ? (
          <div className="p-6 text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-gray-600">No notifications.</div>
        ) : (
          <ul className="divide-y divide-sky-100">
            {items.map((n) => (
              <li key={n.id} className="p-4 flex items-start gap-4">
                <div className={`h-2.5 w-2.5 rounded-full mt-2 ${n.read ? "bg-gray-300" : "bg-sky-500"}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{n.title}</div>
                    <div className="text-xs text-gray-500">{formatTime(n.createdAt)}</div>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{n.message}</div>
                  {n.meta && Object.keys(n.meta).length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">{JSON.stringify(n.meta)}</div>
                  )}
                </div>
                {!n.read && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    className="text-sky-700 hover:text-sky-900 text-sm"
                  >
                    Mark read
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;
