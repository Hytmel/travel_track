import React, { useState } from 'react';
import { PlusIcon } from './Icons';
import DiaryCard from './DiaryCard';
import { useSelectedDestination } from './SelectedDestinationContext';

const TripDiaryTab = () => {
  const { tripInfo, setTripInfo } = useSelectedDestination();
  
  // Test context - remove this later
  console.log('Trip Diary Context:', tripInfo?.diarySections);
  
  // Ensure diarySections is always an array
  const diarySections = tripInfo?.diarySections || [];
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDate, setNewSectionDate] = useState('');
  const [newSectionText, setNewSectionText] = useState('');
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);

  const handleFormImageUpload = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...uploadedImages];
        newImages[index] = e.target.result;
        setUploadedImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim()) {
      const newSection = {
        id: `diary_${Date.now()}`,
        title: newSectionTitle,
        date: newSectionDate,
        text: newSectionText,
        images: uploadedImages
      };
      setTripInfo(prev => ({
        ...prev,
        diarySections: [...(prev.diarySections || []), newSection]
      }));
      setNewSectionTitle('');
      setNewSectionDate('');
      setNewSectionText('');
      setUploadedImages([null, null, null]);
      setShowAddSection(false);
    }
  };

  const handleImageUpload = (sectionId, newImages) => {
    setTripInfo(prev => ({
      ...prev,
      diarySections: (prev.diarySections || []).map(section => 
        section.id === sectionId 
          ? { ...section, images: newImages }
          : section
      )
    }));
  };

  const [editingSection, setEditingSection] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editText, setEditText] = useState('');
  const [editImages, setEditImages] = useState([null, null, null]);

  const handleEdit = (sectionId) => {
    const section = diarySections.find(s => s.id === sectionId);
    if (section) {
      setEditingSection(sectionId);
      setEditTitle(section.title);
      setEditDate(section.date);
      setEditText(section.text);
      setEditImages(section.images || [null, null, null]);
    }
  };

  const handleEditFormImageUpload = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...editImages];
        newImages[index] = e.target.result;
        setEditImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      setTripInfo(prev => ({
        ...prev,
        diarySections: (prev.diarySections || []).map(section => 
          section.id === editingSection 
            ? { 
                ...section, 
                title: editTitle, 
                date: editDate, 
                text: editText, 
                images: editImages 
              }
            : section
        )
      }));
      setEditingSection(null);
      setEditTitle('');
      setEditDate('');
      setEditText('');
      setEditImages([null, null, null]);
    }
  };

  const handleCancelEdit = () => {
    setEditingSection(null);
    setEditTitle('');
    setEditDate('');
    setEditText('');
    setEditImages([null, null, null]);
  };

  const handleDelete = (sectionId) => {
    setTripInfo(prev => ({
      ...prev,
      diarySections: (prev.diarySections || []).filter(section => section.id !== sectionId)
    }));
  };

  return (
    <div className="font-poppins w-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[22px] font-semibold text-[#197CAC] mb-1">Gallery & Diary</h2>
        </div>
        <button 
          onClick={() => setShowAddSection(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#197CAC] text-[#197CAC] bg-white hover:bg-[#e6f4fb] text-sm font-medium"
        >
          <PlusIcon className="w-4 h-4" />
          Add New section
        </button>
      </div>

      {/* Add New Section Form Card */}
      {showAddSection && (
        <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex gap-12">
            {/* Left Side - Title, Date, Diary Text */}
            <div className="flex-1 space-y-4">
              {/* Title and Date on same line */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[19px] font-medium text-black mb-2">Title</label>
                  <input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[19px] font-medium text-black mb-2">Date</label>
                  <input
                    type="date"
                    value={newSectionDate}
                    onChange={(e) => setNewSectionDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[19px] font-medium text-black mb-2">Diary Entry</label>
                <textarea
                  value={newSectionText}
                  onChange={(e) => setNewSectionText(e.target.value)}
                  placeholder="Write your diary entry..."
                  rows="13"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300 resize-none"
                />
              </div>
            </div>

            {/* Right Side - Images */}
            <div className="w-[45%]">
              <div className="relative flex items-center justify-center h-[500px]">
                                 <div className="relative w-full h-[340px] flex items-center">
                   {/* Left Image Placeholder */}
                   <div className="absolute left-0 top-[20px] w-[220px] h-[320px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                                               onChange={(e) => handleFormImageUpload(0, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {uploadedImages[0] ? (
                       <img src={uploadedImages[0]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>

                   {/* Top Right Image Placeholder */}
                   <div className="absolute left-[110px] top-[10px] w-[210px] h-[260px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                                               onChange={(e) => handleFormImageUpload(1, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {uploadedImages[1] ? (
                       <img src={uploadedImages[1]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>

                   {/* Bottom Right Image Placeholder */}
                   <div className="absolute left-[100px] top-[220px] w-[260px] h-[130px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                                               onChange={(e) => handleFormImageUpload(2, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {uploadedImages[2] ? (
                       <img src={uploadedImages[2]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleAddSection}
              className="px-6 py-2 bg-[#197CAC] text-white rounded-lg hover:bg-[#156a94] font-medium"
            >
              Add Section
            </button>
                         <button
               onClick={() => {
                 setShowAddSection(false);
                 setNewSectionTitle('');
                 setNewSectionDate('');
                 setNewSectionText('');
                 setUploadedImages([null, null, null]);
               }}
               className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium"
             >
               Cancel
             </button>
          </div>
                 </div>
       )}

       {/* Edit Section Form Card */}
       {editingSection && (
         <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6 shadow-sm">
           <div className="flex gap-12">
             {/* Left Side - Title, Date, Diary Text */}
             <div className="flex-1 space-y-4">
               {/* Title and Date on same line */}
               <div className="flex gap-4">
                 <div className="flex-1">
                   <label className="block text-[19px] font-medium text-black mb-2">Title</label>
                   <input
                     type="text"
                     value={editTitle}
                     onChange={(e) => setEditTitle(e.target.value)}
                     placeholder="Title"
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                   />
                 </div>
                 <div className="flex-1">
                   <label className="block text-[19px] font-medium text-black mb-2">Date</label>
                   <input
                     type="date"
                     value={editDate}
                     onChange={(e) => setEditDate(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-[19px] font-medium text-black mb-2">Diary Entry</label>
                 <textarea
                   value={editText}
                   onChange={(e) => setEditText(e.target.value)}
                   placeholder="Write your diary entry..."
                   rows="13"
                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300 resize-none"
                 />
               </div>
             </div>

             {/* Right Side - Images */}
             <div className="w-[45%]">
               <div className="relative flex items-center justify-center h-[500px]">
                 <div className="relative w-full h-[340px] flex items-center">
                   {/* Left Image Placeholder */}
                   <div className="absolute left-0 top-[20px] w-[220px] h-[320px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => handleEditFormImageUpload(0, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {editImages[0] ? (
                       <img src={editImages[0]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>

                   {/* Top Right Image Placeholder */}
                   <div className="absolute left-[110px] top-[10px] w-[210px] h-[260px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => handleEditFormImageUpload(1, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {editImages[1] ? (
                       <img src={editImages[1]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>

                   {/* Bottom Right Image Placeholder */}
                   <div className="absolute left-[100px] top-[220px] w-[260px] h-[130px] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
                     <input
                       type="file"
                       accept="image/*"
                       onChange={(e) => handleEditFormImageUpload(2, e.target.files[0])}
                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     />
                     {editImages[2] ? (
                       <img src={editImages[2]} alt="uploaded" className="w-full h-full object-cover" />
                     ) : (
                       <>
                         <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-blue-500 font-medium text-sm">Click to upload</span>
                         <span className="text-gray-500 text-xs mt-1">JPG, JPEG, PNG less than 4MB</span>
                       </>
                     )}
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Bottom Buttons */}
           <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
             <button
               onClick={handleSaveEdit}
               className="px-6 py-2 bg-[#197CAC] text-white rounded-lg hover:bg-[#156a94] font-medium"
             >
               Save Changes
             </button>
             <button
               onClick={handleCancelEdit}
               className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 font-medium"
             >
               Cancel
             </button>
           </div>
         </div>
       )}

                       {/* Display Diary Sections */}
        {diarySections.map((section, index) => (
          <div key={section.id} className="mb-6">
            <DiaryCard 
              id={section.id}
              title={section.title}
              date={section.date}
              text={section.text}
              images={section.images}
              onImageUpload={handleImageUpload}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isReversed={index % 2 === 1} // Alternate layout: even indices (0,2,4...) = normal, odd indices (1,3,5...) = reversed
            />
          </div>
        ))}

             {/* Show message when no sections */}
       {diarySections.length === 0 && !showAddSection && !editingSection && (
         <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
           <div className="text-gray-500 text-lg font-medium mb-2">You do not have diary entries yet!</div>
           <div className="text-gray-400 text-sm">Start documenting your trip memories by adding your first diary entry.</div>
         </div>
       )}
    </div>
  );
};

export default TripDiaryTab; 