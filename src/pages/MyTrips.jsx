import React, { useState } from "react";
import { Calendar, MapPin, Users, Edit, Trash2, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { SearchIcon } from "../components/Icons.jsx";
import TripCard from "../components/TripCard.jsx";

import Footer from "../components/Footer.jsx";
import { useSelectedDestination } from "../components/SelectedDestinationContext.jsx";
import { useFavorites } from "../components/FavoritesContext.jsx";
import ExploreCard from "../components/ExploreCard.jsx";

const MyTrips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingOrder, setRatingOrder] = useState(null);
  const [reviewsActive, setReviewsActive] = useState(false);
  const { userTrips, setUserTrips } = useSelectedDestination();
  const { favoriteDestinations } = useFavorites();

  const getStatusStyle = (status) => {
    switch (status) {
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "booked":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const deleteTrip = (tripId) => {
    setUserTrips(userTrips.filter((trip) => trip.id !== tripId));
  };

  const addNewTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      ...tripData,
      status: "planning",
      activities:
        tripData.days?.reduce(
          (acc, day) => acc + (day.activities?.length || 0),
          0
        ) || 0,
      collaborators: tripData.travelMates?.length || 1,
      collaboratorAvatars: tripData.travelMates?.map(
        (_, index) =>
          `https://randomuser.me/api/portraits/${
            index % 2 === 0 ? "women" : "men"
          }/${index + 1}.jpg`
      ) || ["https://randomuser.me/api/portraits/men/1.jpg"],
    };
    setUserTrips([newTrip, ...userTrips]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Find active trip (planning or booked status)
  const activeTrip =
    userTrips.find((t) => t.status === "planning" || t.status === "booked") ||
    userTrips[0];

  return (
    <div className="min-h-screen bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-8 pt-32 font-poppins">
        {/* Header */}

        {/* Title */}
        <div className="text-[#3ABEFF] font-poppins font-semibold text-lg mb-2">
          My Trips
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 font-poppins">
          Manage your trips
        </h2>

        {/* Search and Filters */}
        <div className="pt-6 mb-8">
          <div className="flex w-full gap-4 mb-8">
            {/* Search Bar */}
            <form
              className="flex-1 flex items-center bg-white border border-gray-200 rounded-full px-4 py-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <SearchIcon className="text-sky-400 h-5 w-5 mr-2" />
              <input
                type="text"
                placeholder="Search for trips ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base font-poppins placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="ml-2 px-5 py-1.5 bg-sky-400 text-white rounded-full font-poppins text-base font-normal hover:bg-sky-500 transition"
              >
                Search
              </button>
            </form>
            {/* Right Icons */}
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                ratingOrder ? "bg-[#197CAC]" : "bg-sky-400"
              } hover:bg-sky-500`}
              onClick={() => {
                if (ratingOrder === null) setRatingOrder("desc");
                else if (ratingOrder === "desc") setRatingOrder("asc");
                else setRatingOrder(null);
              }}
              title="Sort by rating"
            >
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.5833 1.66675V16.3334M14.5833 16.3334L10.9167 12.6667M14.5833 16.3334L18.25 12.6667M5.41667 16.3334V1.66675M5.41667 1.66675L1.75 5.33341M5.41667 1.66675L9.08333 5.33341"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                reviewsActive ? "bg-[#197CAC]" : "bg-sky-400"
              } hover:bg-sky-500`}
              onClick={() => setReviewsActive((prev) => !prev)}
              title="Sort by reviews"
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 7H15.5M1.75 1.5H18.25M7.25 12.5H12.75"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-sky-600 mb-2">
              {userTrips.length}
            </div>
            <div className="text-sky-600 text-lg">Total Trips</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {userTrips.filter((trip) => trip.status === "completed").length}
            </div>
            <div className="text-green-600 text-lg">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {userTrips.reduce((acc, trip) => acc + trip.days, 0)}
            </div>
            <div className="text-orange-600 text-lg">Total Days</div>
          </div>
        </div>

        {/* Combined Trips & Favorites Container */}
        <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-8 pb-16 mb-12">
          {/* Active Trip Section */}
          {activeTrip && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-black">Active trip</h3>
              </div>
              <div className="flex flex-col md:flex-row gap-16 mb-12">
                <img
                  src={activeTrip.image}
                  alt={activeTrip.name}
                  className="w-full md:w-[400px] h-60 rounded-xl object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="font-semibold text-2xl mb-4"
                      style={{ color: "#197CAC" }}
                    >
                      {activeTrip.destination}
                    </h4>
                    <div className="flex flex-col items-center">
                      <div
                        className="text-[14px] font-poppins font-medium mb-1 text-center"
                        style={{ color: "#197CAC" }}
                      >
                        {formatDate(activeTrip.startDate)} -{" "}
                        {formatDate(activeTrip.endDate)}
                      </div>
                      <div
                        className="text-[14px] font-poppins font-medium mb-6 text-center"
                        style={{ color: "#197CAC" }}
                      >
                        {activeTrip.activities} activities
                      </div>
                    </div>
                    <p className="text-gray-600 text-base mb-2 line-clamp-3">
                      {activeTrip.description}
                    </p>
                  </div>
                  <Link
                    to={`/itinerary?trip=${activeTrip.id}`}
                    className="text-sm font-medium hover:underline flex items-center gap-1 mt-2"
                    style={{ color: "#197CAC" }}
                  >
                    more details{" "}
                    <span style={{ color: "#197CAC" }}>&rarr;</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Completed Trips Section */}
          {userTrips.filter((trip) => trip.status === "completed").length >
            0 && (
            <>
              <div className="flex items-center justify-between mb-12 mt-12">
                <h3 className="text-3xl font-bold text-black">
                  Completed Trips
                </h3>
              </div>
              <div
                className="overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-8 pb-2" style={{ minWidth: "400px" }}>
                  {/* Hide scrollbar for Webkit browsers */}
                  <style>{`
                  .overflow-x-auto::-webkit-scrollbar { display: none; }
                `}</style>
                  {userTrips
                    .filter((trip) => trip.status === "completed")
                    .map((trip) => (
                      <div
                        key={trip.id}
                        className="flex-shrink-0"
                        style={{ minWidth: "320px", maxWidth: "340px" }}
                      >
                        <TripCard trip={trip} linkColor="black" />
                      </div>
                    ))}
                  {/* Example extra completed trips for style preview (no delete icon) */}
                  <div
                    className="flex-shrink-0"
                    style={{ minWidth: "320px", maxWidth: "340px" }}
                  >
                    <TripCard
                      trip={{
                        id: "demo1",
                        name: "Tokyo Adventure",
                        destination: "Tokyo, Japan",
                        startDate: "2024-03-10",
                        endDate: "2024-03-20",
                        days: 10,
                        collaborators: 2,
                        collaboratorAvatars: [
                          "https://randomuser.me/api/portraits/men/12.jpg",
                          "https://randomuser.me/api/portraits/women/13.jpg",
                        ],
                        image:
                          "https://images.pexels.com/photos/209074/pexels-photo-209074.jpeg",
                        status: "completed",
                        activities: 20,
                        description:
                          "Experience cherry blossoms, sushi, and the vibrant city life of Tokyo.",
                      }}
                      linkColor="black"
                    />
                  </div>
                  <div
                    className="flex-shrink-0"
                    style={{ minWidth: "320px", maxWidth: "340px" }}
                  >
                    <TripCard
                      trip={{
                        id: "demo2",
                        name: "Sydney Escape",
                        destination: "Sydney, Australia",
                        startDate: "2023-12-01",
                        endDate: "2023-12-10",
                        days: 9,
                        collaborators: 3,
                        collaboratorAvatars: [
                          "https://randomuser.me/api/portraits/men/14.jpg",
                          "https://randomuser.me/api/portraits/women/15.jpg",
                          "https://randomuser.me/api/portraits/men/16.jpg",
                        ],
                        image:
                          "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg",
                        status: "completed",
                        activities: 12,
                        description:
                          "Surf at Bondi Beach and explore the Sydney Opera House.",
                      }}
                      linkColor="black"
                    />
                  </div>
                  <div
                    className="flex-shrink-0"
                    style={{ minWidth: "320px", maxWidth: "340px" }}
                  >
                    <TripCard
                      trip={{
                        id: "demo3",
                        name: "Cairo Discovery",
                        destination: "Cairo, Egypt",
                        startDate: "2023-10-05",
                        endDate: "2023-10-15",
                        days: 10,
                        collaborators: 2,
                        collaboratorAvatars: [
                          "https://randomuser.me/api/portraits/men/17.jpg",
                          "https://randomuser.me/api/portraits/women/18.jpg",
                        ],
                        image:
                          "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg",
                        status: "completed",
                        activities: 14,
                        description:
                          "Marvel at the pyramids and cruise the Nile in historic Cairo.",
                      }}
                      linkColor="black"
                    />
                  </div>
                  <div
                    className="flex-shrink-0"
                    style={{ minWidth: "320px", maxWidth: "340px" }}
                  >
                    <TripCard
                      trip={{
                        id: "demo4",
                        name: "Rio Carnival",
                        destination: "Rio de Janeiro, Brazil",
                        startDate: "2023-02-15",
                        endDate: "2023-02-25",
                        days: 10,
                        collaborators: 4,
                        collaboratorAvatars: [
                          "https://randomuser.me/api/portraits/men/19.jpg",
                          "https://randomuser.me/api/portraits/women/20.jpg",
                          "https://randomuser.me/api/portraits/men/21.jpg",
                          "https://randomuser.me/api/portraits/women/22.jpg",
                        ],
                        image:
                          "https://images.pexels.com/photos/161956/brazil-rio-de-janeiro-carnival-costume-161956.jpeg",
                        status: "completed",
                        activities: 18,
                        description:
                          "Dance at the world-famous Carnival and relax on Copacabana Beach.",
                      }}
                      linkColor="black"
                    />
                  </div>
                  <div
                    className="flex-shrink-0"
                    style={{ minWidth: "320px", maxWidth: "340px" }}
                  >
                    <TripCard
                      trip={{
                        id: "demo5",
                        name: "Alaskan Expedition",
                        destination: "Anchorage, Alaska",
                        startDate: "2022-07-01",
                        endDate: "2022-07-12",
                        days: 11,
                        collaborators: 2,
                        collaboratorAvatars: [
                          "https://randomuser.me/api/portraits/men/23.jpg",
                          "https://randomuser.me/api/portraits/women/24.jpg",
                        ],
                        image:
                          "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
                        status: "completed",
                        activities: 16,
                        description:
                          "See glaciers, wildlife, and the northern lights in Alaska.",
                      }}
                      linkColor="black"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Favorite Destinations Section */}
          {favoriteDestinations.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-12 mt-12">
                <h3 className="text-3xl font-bold text-black">
                  Favorite Destinations
                </h3>
              </div>
              <div
                className="overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="flex gap-8 pb-2" style={{ minWidth: "400px" }}>
                  {favoriteDestinations.map((dest) => (
                    <div
                      key={dest.id}
                      className="flex-shrink-0"
                      style={{ minWidth: "320px", maxWidth: "340px" }}
                    >
                      <ExploreCard destination={dest} />
                    </div>
                  ))}
                </div>
                {/* Hide scrollbar for Webkit browsers */}
                <style>{`
                  .overflow-x-auto::-webkit-scrollbar { display: none; }
                `}</style>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyTrips;
