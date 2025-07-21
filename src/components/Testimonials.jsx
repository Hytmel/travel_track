import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => (
  <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          What Travelers Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Real stories from real travelers who've used TravelPlanner for their adventures.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            "TravelPlanner made organizing our European trip so much easier. The itinerary builder is intuitive and saved us hours of planning!"
          </p>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
              alt="Sarah Johnson"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-500">Traveled to 12 countries</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            "The collaborative features are amazing! My friends and I planned our group trip together in real-time. Highly recommend!"
          </p>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
              alt="Mike Chen"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <div className="font-semibold text-gray-900">Mike Chen</div>
              <div className="text-sm text-gray-500">Adventure enthusiast</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            "Perfect for solo travelers like me. The destination recommendations helped me discover hidden gems I never would have found!"
          </p>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
              alt="Emma Rodriguez"
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <div className="font-semibold text-gray-900">Emma Rodriguez</div>
              <div className="text-sm text-gray-500">Solo traveler</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials; 