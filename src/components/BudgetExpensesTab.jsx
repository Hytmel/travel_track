import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Plus, Edit, Trash2, Home } from 'lucide-react';
import { AlgerianFlagIcon, PlusIcon } from './Icons';
import { useSelectedDestination } from './SelectedDestinationContext';

const BudgetExpensesTab = () => {
  const { tripInfo, setTripInfo } = useSelectedDestination();
  const [expandedSections, setExpandedSections] = useState([]);
  const [expandedChecklists, setExpandedChecklists] = useState([]);

  // Debug: Print context info
  console.log('BudgetExpensesTab - tripInfo:', tripInfo);
  console.log('BudgetExpensesTab - budgetSections:', tripInfo?.budgetSections);

  const colors = ['#7B61FF', '#FFD600', '#197CAC', '#3ABEFF', '#FF7A00', '#00C48C'];

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleChecklist = (sectionId) => {
    setExpandedChecklists(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleCheckbox = (sectionId, itemId) => {
    setTripInfo(prev => ({
      ...prev,
      budgetSections: (prev.budgetSections || []).map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            checklist: section.checklist.map(item => 
              item.id === itemId 
                ? { ...item, checked: !item.checked }
                : item
            )
          };
        }
        return section;
      })
    }));
  };

  const [newItemText, setNewItemText] = useState({});
  const [newItemPrice, setNewItemPrice] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [editingSectionTitle, setEditingSectionTitle] = useState(null);
  const [editSectionTitle, setEditSectionTitle] = useState('');
  const [nextColorIndex, setNextColorIndex] = useState(0);

  const addNewItem = (sectionId) => {
    const text = newItemText[sectionId];
    const price = newItemPrice[sectionId];
    if (text && text.trim()) {
      setTripInfo(prev => ({
        ...prev,
        budgetSections: (prev.budgetSections || []).map(section => {
          if (section.id === sectionId) {
            const newId = Math.max(...section.checklist.map(item => item.id), 0) + 1;
            return {
              ...section,
              checklist: [...section.checklist, {
                id: newId,
                checked: false,
                description: text.trim(),
                cost: price && price.trim() ? `${price.trim()} DA` : '0 DA',
                isSelected: false
              }]
            };
          }
          return section;
        })
      }));
      setNewItemText(prev => ({ ...prev, [sectionId]: '' }));
      setNewItemPrice(prev => ({ ...prev, [sectionId]: '' }));
    }
  };

  const deleteItem = (sectionId, itemId) => {
    setTripInfo(prev => ({
      ...prev,
      budgetSections: (prev.budgetSections || []).map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            checklist: section.checklist.filter(item => item.id !== itemId)
          };
        }
        return section;
      })
    }));
  };

  const startEditing = (sectionId, itemId, description, cost) => {
    setEditingItem({ sectionId, itemId });
    setEditText(description);
    setEditPrice(cost.replace(' DA', ''));
  };

  const saveEdit = (sectionId, itemId) => {
    if (editText.trim()) {
      setTripInfo(prev => ({
        ...prev,
        budgetSections: (prev.budgetSections || []).map(section => {
          if (section.id === sectionId) {
            return {
              ...section,
              checklist: section.checklist.map(item => 
                item.id === itemId 
                  ? { 
                      ...item, 
                      description: editText.trim(),
                      cost: editPrice && editPrice.trim() ? `${editPrice.trim()} DA` : '0 DA'
                    }
                  : item
              )
            };
          }
          return section;
        })
      }));
      setEditingItem(null);
      setEditText('');
      setEditPrice('');
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditText('');
    setEditPrice('');
  };

  const addNewSection = () => {
    if (newSectionName.trim()) {
      const newId = `section_${Date.now()}`;
      const newColor = colors[nextColorIndex % colors.length];
      const newSection = {
        id: newId,
        title: newSectionName.trim(),
        color: newColor,
        costs: {
          totalCost: '---',
          estimatedCost: '---',
          actualCost: '---',
          remainingCost: '---'
        },
        checklist: []
      };
      setTripInfo(prev => ({
        ...prev,
        budgetSections: [...(prev.budgetSections || []), newSection]
      }));
      setExpandedSections(prev => [...prev, newId]);
      setExpandedChecklists(prev => [...prev, newId]);
      setNewSectionName('');
      setShowAddSection(false);
      setNextColorIndex(prev => (prev + 1) % colors.length);
      
      // Focus on the total cost input after a short delay
      setTimeout(() => {
        const totalCostInput = document.querySelector(`[data-section-id="${newId}"] input[placeholder="--- DA"]`);
        if (totalCostInput) {
          totalCostInput.focus();
        }
             }, 100);
     }
   };

   const startEditingSectionTitle = (sectionId, currentTitle) => {
     setEditingSectionTitle(sectionId);
     setEditSectionTitle(currentTitle);
   };

       const saveSectionTitle = (sectionId) => {
      if (editSectionTitle.trim()) {
        setTripInfo(prev => ({
          ...prev,
          budgetSections: (prev.budgetSections || []).map(section => 
            section.id === sectionId 
              ? { ...section, title: editSectionTitle.trim() }
              : section
          )
        }));
        setEditingSectionTitle(null);
        setEditSectionTitle('');
      }
    };

     const cancelSectionTitleEdit = () => {
    setEditingSectionTitle(null);
    setEditSectionTitle('');
  };

  const deleteSection = (sectionId) => {
    setTripInfo(prev => ({
      ...prev,
      budgetSections: (prev.budgetSections || []).filter(section => section.id !== sectionId)
    }));
    setExpandedSections(prev => prev.filter(id => id !== sectionId));
    setExpandedChecklists(prev => prev.filter(id => id !== sectionId));
  };



     return (
     <div className="font-poppins w-full">
      {/* Main Header */}
      <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2">
           <h2 className="text-[20px] font-semibold" style={{ color: '#197CAC' }}>
             Trip Activities
           </h2>
         </div>
                 <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#197CAC] text-[#197CAC] bg-white hover:bg-[#e6f4fb] text-sm font-medium">
             Choose currency
             <AlgerianFlagIcon className="w-6 h-6" />
           </button>
                                                                                 <button 
                                           className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#197CAC] text-[#197CAC] bg-white hover:bg-[#e6f4fb] text-sm font-medium"
                                           onClick={() => setShowAddSection(true)}
                                         >
                    <PlusIcon className="w-3 h-3" />
                    Add New Section
                  </button>
         </div>
      </div>

                           

                                                                                                                       {/* Sections */}
                       <div className="space-y-4">
              {(tripInfo.budgetSections || []).length === 0 && !showAddSection ? (
               <div
                 className="flex items-center bg-[#F6F8FB] rounded-lg p-4 mt-2"
                 style={{ borderLeft: '6px solid #7B61FF', minHeight: 56 }}
               >
                 <span className="text-[#7B61FF] font-poppins font-semibold text-[20px]">You do not have activities yet !</span>
               </div>
                           ) : (
                (tripInfo.budgetSections || []).map((section) => (
            <div key={section.id} className="bg-white rounded-lg border border-gray-200 shadow-sm" style={{ borderLeft: `6px solid ${section.color}` }} data-section-id={section.id}>
             {/* Section Header */}
                          <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                {editingSectionTitle === section.id ? (
                  // Edit mode for section title
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                         <input
                       type="text"
                       value={editSectionTitle}
                       onChange={(e) => setEditSectionTitle(e.target.value)}
                       className="text-[18px] font-semibold bg-transparent border-none outline-none"
                       style={{ color: section.color }}
                       onKeyDown={(e) => {
                         if (e.key === 'Enter') {
                           saveSectionTitle(section.id);
                         } else if (e.key === 'Escape') {
                           cancelSectionTitleEdit();
                         }
                       }}
                       autoFocus
                     />
                    <button 
                      className="text-green-500 hover:text-green-700"
                      onClick={() => saveSectionTitle(section.id)}
                    >
                      ✓
                    </button>
                    <button 
                      className="text-red-500 hover:text-red-700"
                      onClick={cancelSectionTitleEdit}
                    >
                      ✕
                    </button>
                  </div>
                                 ) : (
                   // View mode for section title
                   <div className="flex items-center gap-2">
                                          <h3 
                        className="text-[18px] font-semibold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" 
                        style={{ color: section.color }}
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditingSectionTitle(section.id, section.title);
                        }}
                      >
                        {section.title}
                      </h3>
                   </div>
                 )}
                 <div className="flex items-center gap-2">
                   {expandedSections.includes(section.id) ? (
                     <ChevronUp className="h-5 w-5 text-gray-600" />
                   ) : (
                     <ChevronDown className="h-5 w-5 text-gray-600" />
                   )}
                   <button 
                     className="ml-2 text-red-400 hover:text-red-600"
                     onClick={(e) => {
                       e.stopPropagation();
                       deleteSection(section.id);
                     }}
                   >
                     <Trash2 className="h-4 w-4" />
                   </button>
                 </div>
              </div>

             {/* Section Content */}
             {expandedSections.includes(section.id) && (
               <div className="px-4 pb-4">
                 {/* Cost Overview */}
                 <div className="grid grid-cols-4 gap-4 mb-6">
                   <div>
                                          <label className="block text-[19px] font-medium text-black mb-2">Total cost</label>
                     <input 
                       type="text" 
                       placeholder="--- DA" 
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                     />
                   </div>
                   <div>
                                          <label className="block text-[19px] font-medium text-black mb-2">Estimated Cost</label>
                     <input 
                       type="text" 
                       placeholder="--- DA" 
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                     />
                   </div>
                   <div>
                                          <label className="block text-[19px] font-medium text-black mb-2">Actual Cost</label>
                     <input 
                       type="text" 
                       placeholder="--- DA" 
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                     />
                   </div>
                   <div>
                                          <label className="block text-[19px] font-medium text-black mb-2">Remaining cost</label>
                     <input 
                       type="text" 
                       placeholder="--- DA" 
                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-300"
                     />
                   </div>
                 </div>

                 {/* Checklist Section */}
                 <div className="pt-4">
                   <div 
                     className="flex items-center justify-between mb-4 cursor-pointer"
                     onClick={() => toggleChecklist(section.id)}
                   >
                                          <h4 className="text-[19px] font-medium text-black">Check list</h4>
                     {expandedChecklists.includes(section.id) ? (
                       <ChevronUp className="h-4 w-4 text-gray-600" />
                     ) : (
                       <ChevronDown className="h-4 w-4 text-gray-600" />
                     )}
                   </div>

                                      {expandedChecklists.includes(section.id) && (
                      <div className="space-y-2 border border-gray-300 rounded-lg p-2 shadow-sm">
                                                                      {section.checklist.map((item) => (
                           <div key={item.id} className="flex items-center px-6 py-2">
                                                           <input
                                type="checkbox"
                                checked={item.checked}
                                onChange={() => toggleCheckbox(section.id, item.id)}
                                className="mr-3 w-4 h-4"
                                style={{ accentColor: section.color }}
                              />
                             {editingItem && editingItem.sectionId === section.id && editingItem.itemId === item.id ? (
                               // Edit mode
                               <>
                                 <input
                                   className="flex-1 border-none bg-transparent outline-none px-2 py-1 text-gray-700 mr-4"
                                   value={editText}
                                   onChange={(e) => setEditText(e.target.value)}
                                   onKeyDown={(e) => {
                                     if (e.key === 'Enter') {
                                       saveEdit(section.id, item.id);
                                     } else if (e.key === 'Escape') {
                                       cancelEdit();
                                     }
                                   }}
                                   autoFocus
                                 />
                                 <input
                                   className="w-24 border-none bg-transparent outline-none px-2 py-1 text-gray-700 mr-1"
                                   value={editPrice}
                                   onChange={(e) => setEditPrice(e.target.value)}
                                   onKeyDown={(e) => {
                                     if (e.key === 'Enter') {
                                       saveEdit(section.id, item.id);
                                     } else if (e.key === 'Escape') {
                                       cancelEdit();
                                     }
                                   }}
                                 />
                                 <span className="text-gray-700 text-sm mr-4">DA</span>
                                 <button 
                                   className="ml-2 text-green-500 hover:text-green-700"
                                   onClick={() => saveEdit(section.id, item.id)}
                                 >
                                   ✓
                                 </button>
                                 <button 
                                   className="ml-2 text-red-500 hover:text-red-700"
                                   onClick={cancelEdit}
                                 >
                                   ✕
                                 </button>
                               </>
                             ) : (
                               // View mode
                               <>
                                                                   <span 
                                    className={`flex-1 font-normal text-[17px] ${
                                      item.checked ? 'line-through' : ''
                                    }`} 
                                    style={{ color: item.checked ? section.color : '#00000075' }}
                                  >
                                    {item.description}
                                  </span>
                                  <span 
                                    className="text-sm font-medium mr-4"
                                    style={{ color: item.checked ? section.color : '#6B7280' }}
                                  >
                                    {item.cost}
                                  </span>
                                  <button 
                                    className="ml-2" 
                                    style={{ color: section.color }}
                                    onClick={() => startEditing(section.id, item.id, item.description, item.cost)}
                                  >
                                   <Edit className="h-4 w-4" />
                                 </button>
                                 <button 
                                   className="ml-2 text-red-400 hover:text-red-600"
                                   onClick={() => deleteItem(section.id, item.id)}
                                 >
                                   <Trash2 className="h-4 w-4" />
                                 </button>
                               </>
                             )}
                           </div>
                         ))}
                       
                                              {/* Add New Item */}
                        <div className="flex items-center px-6 py-2">
                          <input
                            className="flex-1 border-none bg-transparent outline-none px-2 py-1 text-gray-400 mr-4"
                            placeholder="add..."
                            value={newItemText[section.id] || ''}
                            onChange={(e) => setNewItemText(prev => ({ ...prev, [section.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                addNewItem(section.id);
                              }
                            }}
                          />
                          <input
                            className="w-24 border-none bg-transparent outline-none px-2 py-1 text-gray-400"
                            placeholder="price"
                            value={newItemPrice[section.id] || ''}
                            onChange={(e) => setNewItemPrice(prev => ({ ...prev, [section.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                addNewItem(section.id);
                              }
                            }}
                          />
                          <span className="text-gray-400 text-sm ml-1">DA</span>
                        </div>
                     </div>
                   )}
                 </div>
               </div>
             )}
                           </div>
              ))
            )}
          
                    {/* Add New Section Inline */}
                                           {showAddSection && (
              <div
                className="bg-white rounded-lg border border-gray-200 shadow-sm"
                style={{ borderLeft: `6px solid ${colors[nextColorIndex % colors.length]}` }}
              >
              <div className="flex flex-col md:flex-row items-center gap-4 px-6 pt-4 pb-4">
                                <input
                   className="flex-1 border-none bg-transparent outline-none px-3 py-2 text-base"
                   placeholder="Section name"
                   value={newSectionName}
                   onChange={(e) => setNewSectionName(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                       addNewSection();
                     }
                   }}
                   autoFocus
                 />
                <div className="flex gap-2 mt-2 md:mt-0">
                                                                           <button
                      onClick={addNewSection}
                      className="px-4 py-2 text-white font-medium rounded-lg transition-colors"
                      style={{ backgroundColor: colors[nextColorIndex % colors.length] }}
                    >
                    Add Section
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSection(false);
                      setNewSectionName('');
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
       </div>
    </div>
  );
};

export default BudgetExpensesTab; 