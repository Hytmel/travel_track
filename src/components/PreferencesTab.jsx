import React from "react";

const PreferencesTab = ({ user, preferencesForm, setPreferencesForm, updatePreferences }) => {
  const interestOptions = [
    "beaches",
    "mountains",
    "cities",
    "adventure",
    "food",
    "culture",
    "romance",
    "family",
    "wildlife",
    "history",
  ];

  const dietaryOptions = [
    "vegetarian",
    "vegan",
    "halal",
    "kosher",
    "gluten_free",
    "dairy_free",
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          updatePreferences(preferencesForm);
        }}
      >
        {/* Basic preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">Budget</label>
            <select
              className="w-full rounded-md border border-sky-200 bg-gradient-to-b from-white to-sky-50 shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 px-3 py-2"
              value={preferencesForm.budget}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, budget: e.target.value }))}
            >
              <option value="budget">Budget</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-fuchsia-800 mb-2">Travel style</label>
            <select
              className="w-full rounded-md border border-fuchsia-200 bg-gradient-to-b from-white to-fuchsia-50 shadow-sm focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200/60 px-3 py-2"
              value={preferencesForm.travelStyle}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, travelStyle: e.target.value }))}
            >
              <option value="relaxed">Relaxed</option>
              <option value="balanced">Balanced</option>
              <option value="packed">Packed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-800 mb-2">Accommodation</label>
            <select
              className="w-full rounded-md border border-amber-200 bg-gradient-to-b from-white to-amber-50 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 px-3 py-2"
              value={preferencesForm.accommodationType}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, accommodationType: e.target.value }))}
            >
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
              <option value="apartment">Apartment</option>
              <option value="resort">Resort</option>
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Interests</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map((opt) => {
              const active = preferencesForm.interests.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setPreferencesForm((p) => ({
                      ...p,
                      interests: active
                        ? p.interests.filter((i) => i !== opt)
                        : [...p.interests, opt],
                    }));
                  }}
                  className={`${active ? "bg-sky-100 text-sky-800 border-sky-300 shadow-sm" : "bg-white text-gray-700 border-gray-300"} border rounded-full px-3 py-1 text-sm transition hover:shadow hover:-translate-y-[1px]`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dietary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Dietary</label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((opt) => {
              const active = preferencesForm.dietary.includes(opt);
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setPreferencesForm((p) => ({
                      ...p,
                      dietary: active
                        ? p.dietary.filter((i) => i !== opt)
                        : [...p.dietary, opt],
                    }));
                  }}
                  className={`${active ? "bg-emerald-100 text-emerald-800 border-emerald-300 shadow-sm" : "bg-white text-gray-700 border-gray-300"} border rounded-full px-3 py-1 text-sm transition hover:shadow hover:-translate-y-[1px]`}
                >
                  {opt.replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-emerald-800">
            <input
              type="checkbox"
              className="rounded border-gray-300 accent-emerald-500"
              checked={preferencesForm.needsAccessibility}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, needsAccessibility: e.target.checked }))}
            />
            Needs accessibility
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-amber-800">
            <input
              type="checkbox"
              className="rounded border-gray-300 accent-amber-500"
              checked={preferencesForm.avoidStairs}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, avoidStairs: e.target.checked }))}
            />
            Avoid stairs
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-fuchsia-800">
            <input
              type="checkbox"
              className="rounded border-gray-300 accent-fuchsia-500"
              checked={preferencesForm.wheelchairFriendlyOnly}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, wheelchairFriendlyOnly: e.target.checked }))}
            />
            Wheelchair friendly only
          </label>
        </div>

        {/* Duration and climate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">Min days</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-md border border-indigo-200 bg-gradient-to-b from-white to-indigo-50 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/60 px-3 py-2"
              value={preferencesForm.preferredDuration?.minDays ?? 3}
              onChange={(e) => setPreferencesForm((p) => ({
                ...p,
                preferredDuration: { ...(p.preferredDuration || {}), minDays: Number(e.target.value) },
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-800 mb-2">Max days</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-md border border-indigo-200 bg-gradient-to-b from-white to-indigo-50 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/60 px-3 py-2"
              value={preferencesForm.preferredDuration?.maxDays ?? 7}
              onChange={(e) => setPreferencesForm((p) => ({
                ...p,
                preferredDuration: { ...(p.preferredDuration || {}), maxDays: Number(e.target.value) },
              }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-cyan-800 mb-2">Preferred climate</label>
            <select
              className="w-full rounded-md border border-cyan-200 bg-gradient-to-b from-white to-cyan-50 shadow-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200/60 px-3 py-2"
              value={preferencesForm.preferredClimate}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, preferredClimate: e.target.value }))}
            >
              <option value="">No preference</option>
              <option value="tropical">Tropical</option>
              <option value="temperate">Temperate</option>
              <option value="cold">Cold</option>
              <option value="dry">Dry</option>
            </select>
          </div>
        </div>

        {/* Explore defaults */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-sky-800 mb-2">Default category</label>
            <select
              className="w-full rounded-md border border-sky-200 bg-gradient-to-b from-white to-sky-50 shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 px-3 py-2"
              value={preferencesForm.defaultCategory}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, defaultCategory: e.target.value }))}
            >
              <option value="all">All</option>
              <option value="hotels">Hotels</option>
              <option value="dishes">Dishes & food</option>
              <option value="flights">Flights</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-emerald-800 mb-2">Default sort</label>
            <select
              className="w-full rounded-md border border-emerald-200 bg-gradient-to-b from-white to-emerald-50 shadow-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/60 px-3 py-2"
              value={preferencesForm.defaultSort}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, defaultSort: e.target.value }))}
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-fuchsia-800 mb-2">Rating order</label>
            <select
              className="w-full rounded-md border border-fuchsia-200 bg-gradient-to-b from-white to-fuchsia-50 shadow-sm focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200/60 px-3 py-2"
              value={preferencesForm.defaultRatingOrder ?? ""}
              onChange={(e) => setPreferencesForm((p) => ({ ...p, defaultRatingOrder: e.target.value || null }))}
            >
              <option value="">None</option>
              <option value="asc">Low → High</option>
              <option value="desc">High → Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-sky-600 hover:to-sky-700 shadow-sm font-semibold">
            Save preferences
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 px-6 py-2 rounded-lg hover:from-slate-200 hover:to-slate-300 shadow-sm font-medium"
            onClick={() =>
              setPreferencesForm({
                budget: user?.preferences?.budget || "moderate",
                travelStyle: user?.preferences?.travelStyle || "balanced",
                accommodationType: user?.preferences?.accommodationType || "hotel",
                interests: user?.preferences?.interests || [],
                dietary: user?.preferences?.dietary || [],
                needsAccessibility: user?.preferences?.needsAccessibility || false,
                avoidStairs: user?.preferences?.avoidStairs || false,
                wheelchairFriendlyOnly: user?.preferences?.wheelchairFriendlyOnly || false,
                preferredDuration: user?.preferences?.preferredDuration || { minDays: 3, maxDays: 7 },
                preferredClimate: user?.preferences?.preferredClimate || "",
                defaultCategory: user?.preferences?.defaultCategory || "all",
                defaultSort: user?.preferences?.defaultSort || "popularity",
                defaultRatingOrder: user?.preferences?.defaultRatingOrder ?? null,
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesTab;
