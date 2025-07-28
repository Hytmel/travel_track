import React, { useState } from 'react';
import { DateIcon, EditIcon, DeleteIcon } from './Icons';

const DiaryCard = ({ title, date, text, images, onImageUpload, id, onEdit, onDelete, isReversed = false }) => {
  const [currentImages, setCurrentImages] = useState(images || [null, null, null]);

  const handleImageUpload = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...currentImages];
        newImages[index] = e.target.result;
        setCurrentImages(newImages);
        if (onImageUpload) {
          onImageUpload(id, newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="bg-white border border-gray-300 rounded-xl px-8 py-8 shadow-sm relative">
      {/* Edit and Delete Icons */}
      <div className="absolute top-4 right-4 flex gap-2">
                 <button 
           onClick={() => onEdit && onEdit(id)}
           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
         >
           <EditIcon className="w-5 h-5" color="#000000" />
         </button>
        <button 
          onClick={() => onDelete && onDelete(id)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* Title and HR inside card */}
      <div className="mb-6">
        <div className="text-[21px] font-medium text-black mb-2">
          {title}
        </div>
        <hr className="border-gray-300" />
      </div>
      
             <div className="flex gap-8">
         {/* Gallery */}
         <div className={`relative flex-shrink-0 w-[40%] min-w-[300px] flex items-center justify-center h-[400px] ${isReversed ? 'order-2' : 'order-1'}`}>
          {/* Overlapping images, vertically centered */}
                     <div className="relative w-full h-[340px] flex items-center">
             {/* Left Image */}
             <div className="absolute left-0 top-[20px] w-[220px] h-[320px] overflow-hidden rounded-lg shadow-xl z-10" style={{boxShadow:'0 4px 24px 0 rgba(0,0,0,0.10)'}}>
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => handleImageUpload(0, e.target.files[0])}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
               />
               {currentImages[0] ? (
                 <img src={currentImages[0]} alt="gallery1" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                   <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                   <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                 </div>
               )}
             </div>
             
             {/* Top Right Image */}
             <div className="absolute left-[110px] top-[10px] w-[210px] h-[260px] overflow-hidden rounded-lg shadow-xl z-20" style={{boxShadow:'0 4px 24px 0 rgba(0,0,0,0.13)'}}>
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => handleImageUpload(1, e.target.files[0])}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
               />
               {currentImages[1] ? (
                 <img src={currentImages[1]} alt="gallery2" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                   <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                   <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                 </div>
               )}
             </div>
             
             {/* Bottom Right Image */}
             <div className="absolute left-[100px] top-[220px] w-[260px] h-[130px] overflow-hidden rounded-lg shadow-xl z-30" style={{boxShadow:'0 4px 24px 0 rgba(0,0,0,0.10)'}}>
               <input
                 type="file"
                 accept="image/*"
                 onChange={(e) => handleImageUpload(2, e.target.files[0])}
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
               />
               {currentImages[2] ? (
                 <img src={currentImages[2]} alt="gallery3" className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                   <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                   </svg>
                   <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                   <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                 </div>
               )}
             </div>
           </div>
        </div>
        
                 {/* Diary Content */}
         <div className={`flex-1 flex flex-col justify-start ${isReversed ? 'order-1' : 'order-2'}`}>
          {/* Date Section */}
          <div className="flex items-center gap-2 mb-6">
            <DateIcon className="w-6 h-6 text-[#B0B0B0]" />
            <span className="text-[#B0B0B0] text-[18px] tracking-widest font-medium">
              {date ? new Date(date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              }) : '-- --- --- ----'}
            </span>
          </div>
          
          {/* Text Content */}
          <div className="text-[17px] text-[#A0A0A0] font-normal leading-relaxed overflow-hidden">
            <p className="whitespace-pre-wrap break-words">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;