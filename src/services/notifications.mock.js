const LS_KEY = "tt_notifications_v1";

function readLS() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLS(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export async function getNotifications({ status = "all", limit = 50 } = {}) {
  const list = readLS().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filtered = status === "unread" ? list.filter((n) => !n.read) : list;
  return filtered.slice(0, limit);
}

export async function markRead(ids) {
  const set = new Set(ids);
  const list = readLS().map((n) => (set.has(n.id) ? { ...n, read: true } : n));
  writeLS(list);
  return { ok: true };
}

export async function markAllRead() {
  const list = readLS().map((n) => ({ ...n, read: true }));
  writeLS(list);
  return { ok: true };
}

export async function seedIfEmpty() {
  if (readLS().length) return;
  writeLS([
    {
      id: "1",
      type: "trip_update",
      title: "Itinerary saved",
      message: "Your Lake Como trip was saved.",
      createdAt: new Date().toISOString(),
      read: false,
      meta: { tripId: "t1" },
    },
    {
      id: "2",
      type: "reminder",
      title: "Packing reminder",
      message: "Don’t forget your passport.",
      createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
      read: false,
      meta: {},
    },
  ]);
}

export function addMockNotification(n) {
  const list = readLS();
  const item = {
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
    createdAt: new Date().toISOString(),
    read: false,
    ...n,
  };
  writeLS([item, ...list]);
  return item;
}
