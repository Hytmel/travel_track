import React from "react";
import { Edit, Camera, Calendar, Mail } from "lucide-react";

const ProfileTab = ({ user, isEditing, setIsEditing, editForm, setEditForm, updateProfile, handleAvatarChange }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-sky-100 to-sky-50 rounded-2xl shadow p-6 mb-8 flex flex-col items-center relative">
        <div className="absolute top-4 right-4">
          {!isEditing && (
            <button
              className="flex items-center gap-2 text-sky-600 hover:text-sky-800 font-medium"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="h-4 w-4" /> Edit
            </button>
          )}
        </div>
        <div className="relative inline-block mb-4">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <label htmlFor="avatar-upload-header" className="absolute bottom-0 right-0 bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600 cursor-pointer transition-colors">
            <Camera className="h-4 w-4" />
            <input
              id="avatar-upload-header"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex flex-row items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.firstName || user.name || "-"}
          </h2>
          <h2 className="text-2xl font-bold text-gray-900">
            {user.lastName || ""}
          </h2>
        </div>
        {user.bio && (
          <p className="text-gray-600 text-center mb-2">
            {user.bio}
          </p>
        )}
        <p className="text-gray-500 flex items-center gap-2">
          <Mail className="h-4 w-4" /> {user.email}
        </p>
      </div>

      <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50 p-6 shadow-sm">
        {isEditing ? (
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile(editForm);
              setIsEditing(false);
            }}
          >
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-sky-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-sky-200 bg-gradient-to-b from-white to-sky-50 shadow-sm focus:border-sky-400 focus:ring-2 focus:ring-sky-200/60 focus:outline-none px-3 py-2"
                  value={editForm.firstName}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-fuchsia-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-fuchsia-200 bg-gradient-to-b from-white to-fuchsia-50 shadow-sm focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200/60 focus:outline-none px-3 py-2"
                  value={editForm.lastName}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 flex items-center gap-2 mb-2">
                <Edit className="h-4 w-4" />
                Bio
              </label>
              <textarea
                className="w-full rounded-md border border-amber-200 bg-gradient-to-b from-white to-amber-50 shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 focus:outline-none px-3 py-2"
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm((f) => ({
                    ...f,
                    bio: e.target.value,
                  }))
                }
                rows={3}
              />
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-indigo-800 flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-md border border-indigo-200 bg-gradient-to-b from-white to-indigo-50 shadow-sm focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200/60 focus:outline-none px-3 py-2"
                  value={editForm.dateOfBirth}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      dateOfBirth: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-emerald-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  Gender
                </label>
                <select
                  className="w-full rounded-md border border-emerald-200 bg-gradient-to-b from-white to-emerald-50 shadow-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200/60 focus:outline-none px-3 py-2"
                  value={editForm.gender}
                  onChange={(e) =>
                    setEditForm((f) => ({
                      ...f,
                      gender: e.target.value,
                    }))
                  }
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-6 py-2 rounded-lg hover:from-sky-600 hover:to-sky-700 shadow-sm font-semibold"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gradient-to-r from-slate-100 to-slate-200 text-gray-700 px-6 py-2 rounded-lg hover:from-slate-200 hover:to-slate-300 shadow-sm font-medium"
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    bio: user?.bio || "",
                    dateOfBirth: user?.dateOfBirth || "",
                    gender: user?.gender || "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-sky-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  First Name
                </label>
                <div className="text-gray-900 text-base font-normal">
                  {user.firstName || "-"}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-fuchsia-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  Last Name
                </label>
                <div className="text-gray-900 text-base font-normal">
                  {user.lastName || "-"}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-800 flex items-center gap-2 mb-2">
                <Edit className="h-4 w-4" />
                Bio
              </label>
              <div className="text-gray-900 text-base font-normal min-h-[24px]">
                {user.bio || "-"}
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-indigo-800 flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </label>
                <div className="text-gray-900 text-base font-normal">
                  {user.dateOfBirth || "-"}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-emerald-800 flex items-center gap-2 mb-2">
                  <Edit className="h-4 w-4" />
                  Gender
                </label>
                <div className="text-gray-900 text-base font-normal">
                  {user.gender || "-"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
