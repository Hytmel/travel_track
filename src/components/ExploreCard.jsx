import React from "react";
import { Star, MapPin, Clock, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "./FavoritesContext.jsx";

const ExploreCard = ({ destination }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(destination.id);
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group font-poppins flex flex-col h-full">
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full capitalize">
          {destination.category.replace(/_/g, " ")}
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1">
          <div className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full flex items-center">
            <Star className="h-3 w-3 fill-current text-yellow-400" />
            <span>{destination.rating}</span>
          </div>
          <button
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(destination);
            }}
            className="ml-2 p-1 rounded-full bg-white/80 hover:bg-white shadow"
            style={{ lineHeight: 0 }}
          >
            <Heart
              className={
                favorited
                  ? "h-5 w-5 text-red-500 fill-red-500"
                  : "h-5 w-5 text-gray-400"
              }
              fill={favorited ? "currentColor" : "none"}
              strokeWidth={favorited ? 1.5 : 2}
            />
          </button>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <h3
            className="font-semibold text-lg mb-1 font-poppins"
            style={{ color: "#197CAC" }}
          >
            {destination.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mb-2 font-poppins">
            <MapPin className="h-3 w-3 mr-1" />
            {destination.country}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed font-poppins">
            {destination.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 px-5 pb-4 pt-2 font-poppins mt-auto">
        <div className="font-poppins">
          {destination.reviews.toLocaleString()} reviews
        </div>
        <Link
          to={`/destination/${destination.id}`}
          className="flex items-center space-x-1 text-black hover:text-gray-700 font-medium transition-colors text-[17px]"
        >
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 text-black" />
        </Link>
      </div>
    </div>
  );
};

export default ExploreCard;
