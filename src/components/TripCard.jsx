import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const TripCard = ({ trip, linkColor = "#197CAC" }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 w-[340px] h-[370px] flex flex-col overflow-hidden font-poppins transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative h-48 overflow-hidden group rounded-2xl">
      <img
        src={trip.image}
        alt={trip.destination}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
      />
      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full capitalize font-poppins">
        {trip.status}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-1 justify-between">
      <h3 className="font-poppins font-semibold text-lg text-[#197CAC] mb-2 text-center">
        {trip.destination}
      </h3>
      <div
        className="text-[14px] font-poppins font-normal text-center mb-1"
        style={{ color: "#197CAC" }}
      >
        {trip.startDate} - {trip.endDate}
      </div>
      <div
        className="text-[14px] font-poppins font-normal text-center mb-4"
        style={{ color: "#197CAC" }}
      >
        {trip.activities} activities
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex -space-x-2">
          {trip.collaboratorAvatars &&
            trip.collaboratorAvatars.map((avatar, idx) => (
              <img
                key={idx}
                src={avatar}
                alt="collaborator"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                style={{ zIndex: 10 - idx }}
              />
            ))}
        </div>
        <Link
          to={`/itinerary?trip=${trip.id}`}
          className="text-sm font-medium font-poppins flex items-center gap-1 hover:underline"
          style={{ color: linkColor }}
        >
          More details{" "}
          <span style={{ color: linkColor }} className="font-poppins">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  </div>
);

export default TripCard;
