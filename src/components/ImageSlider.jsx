import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = ({ images, className = '' }) => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  // Touch events for mobile
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (startX.current === null) return;
    const diff = e.touches[0].clientX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext();
      else handlePrev();
      startX.current = null;
    }
  };
  const handleTouchEnd = () => {
    startX.current = null;
  };

  // Mouse events for desktop
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current || startX.current === null) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 50) {
      if (diff < 0) handleNext();
      else handlePrev();
      isDragging.current = false;
      startX.current = null;
    }
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    startX.current = null;
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };
  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className="rounded-3xl overflow-hidden shadow-lg bg-white relative select-none group w-full h-full"
        style={{ width: '100%', height: '100%' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        role="presentation"
      >
        <img
          src={images[current]}
          alt="Slider Visual"
          className="w-full h-full object-cover transition-all duration-500"
          draggable={false}
        />
        {/* Left Arrow */}
        <button
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full text-[#197CAC] opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={handlePrev}
          aria-label="Previous image"
          type="button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* Right Arrow */}
        <button
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white shadow p-2 rounded-full text-[#197CAC] opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={handleNext}
          aria-label="Next image"
          type="button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 py-4 w-full">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`inline-block ${idx === current ? 'w-3 h-2 rounded-full bg-[#197CAC]' : 'w-2 h-2 rounded-full border border-[#197CAC] bg-white'} transition-all`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider; 