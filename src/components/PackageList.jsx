import React, { useState, useEffect, useRef } from 'react';
import { EditIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon } from './Icons';
import { useSelectedDestination } from './SelectedDestinationContext';

const defaultSections = [
  {
    id: 1,
    name: 'Clothing',
    items: [
      { id: 1, text: '4-5 casual tops (lightweight, breathable)', checked: false },
      { id: 2, text: '2-3 dresses or skirts (for warm days and evening dinners)', checked: false },
      { id: 3, text: '2-3 pairs of pants or shorts', checked: false },
      { id: 4, text: 'Swimsuit (for coastal cities like Amalfi or Lake Como)', checked: false },
      { id: 5, text: '2-3 dresses or skirts (for warm days and evening dinners)', checked: false },
      { id: 6, text: '2-3 dresses or skirts (for warm days and evening dinners)', checked: false },
    ],
  },
  {
    id: 2,
    name: 'Toiletries',
    items: [
      { id: 1, text: 'Toothbrush & toothpaste', checked: true },
      { id: 2, text: 'Travel-size shampoo & body wash', checked: true },
      { id: 3, text: 'Sunscreen SPF 30+', checked: true },
    ],
  },
];

function PackageList() {
  const { tripInfo, setTripInfo } = useSelectedDestination();
  const sections = tripInfo.packageList || [];
  console.log('Current packageList from context:', sections);
  const [editingItem, setEditingItem] = useState({ sectionId: null, itemId: null });
  const [newItemText, setNewItemText] = useState({});
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [editingValue, setEditingValue] = useState('');
  const addSectionInputRef = useRef(null);
  const addItemInputRefs = useRef({});
  const [expandedSections, setExpandedSections] = useState([]);
  const toggleSection = (sectionId) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  useEffect(() => {
    if (showAddSection && addSectionInputRef.current) {
      addSectionInputRef.current.focus();
    }
  }, [showAddSection]);

  const handleCheck = (sectionId, itemId) => {
    setTripInfo(prev => ({
      ...prev,
      packageList: (prev.packageList || []).map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : section
      ),
    }));
  };

  const handleEdit = (sectionId, itemId, text) => {
    setTripInfo(prev => ({
      ...prev,
      packageList: (prev.packageList || []).map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId ? { ...item, text } : item
              ),
            }
          : section
      ),
    }));
    setEditingItem({ sectionId: null, itemId: null });
    setEditingValue('');
  };

  const handleDelete = (sectionId, itemId) => {
    setTripInfo(prev => ({
      ...prev,
      packageList: (prev.packageList || []).map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter(item => item.id !== itemId),
            }
          : section
      ),
    }));
  };

  const handleAddItem = (sectionId, text) => {
    if (!text.trim()) return;
    setTripInfo(prev => ({
      ...prev,
      packageList: (prev.packageList || []).map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: [
                ...section.items,
                { id: Date.now(), text, checked: false },
              ],
            }
          : section
      ),
    }));
    setNewItemText(prev => ({ ...prev, [sectionId]: '' }));
  };

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    const newSectionId = Date.now();
    setTripInfo(prev => ({
      ...prev,
      packageList: [
        ...(prev.packageList || []),
        { id: newSectionId, name: newSectionName, items: [] },
      ],
    }));
    setNewSectionName('');
    setShowAddSection(false);
    
    // Expand the new section and focus on its add item input
    setExpandedSections(prev => [...prev, newSectionId]);
    
    // Focus on the add item input after a short delay to ensure the DOM is updated
    setTimeout(() => {
      if (addItemInputRefs.current[newSectionId]) {
        addItemInputRefs.current[newSectionId].focus();
      }
    }, 100);
  };

  const handleDeleteSection = (sectionId) => {
    setTripInfo(prev => ({
      ...prev,
      packageList: (prev.packageList || []).filter(section => section.id !== sectionId),
    }));
  };

  return (
    <div className="bg-white rounded-2xl  p-0 mt-8 mb-10 font-poppins">
      <div className="flex items-center justify-between pt-6 pb-2">
        <div className="text-[24px] font-semibold mb-6 font-poppins" style={{ color: '#197CAC' }}>Package list</div>
        <div className="flex gap-2">
          <button className="px-4 py-1 rounded-full border border-[#197CAC] text-[#197CAC] bg-white hover:bg-[#e6f4fb] text-sm font-medium">generate with AI</button>
          <button className="flex items-center gap-2 px-4 py-1 rounded-full border border-[#197CAC] text-[#197CAC] bg-white hover:bg-[#e6f4fb] text-sm font-medium" onClick={() => setShowAddSection(true)}>
            <PlusIcon className="w-3 h-3" />
            Add New Section
          </button>
        </div>
      </div>
      <div className="space-y-6 ">
        {sections.length === 0 && !showAddSection ? (
          <div
            className="flex items-center bg-[#F6F8FB] rounded-lg p-4 mt-2"
            style={{ borderLeft: '6px solid #7B61FF', minHeight: 56 }}
          >
            <span className="text-[#7B61FF] font-poppins font-semibold text-[20px]">You do not have any package sections yet!</span>
          </div>
        ) : (
          sections.map((section, idx) => {
            // First section uses #197CAC, then cycle through the rest
            const borderColors = ['#7B61FF', '#197CAC', '#FFD600', '#3ABEFF', '#FF7A00', '#00C48C'];
            const color = borderColors[idx % borderColors.length];
            const expanded = expandedSections.includes(section.id);
            return (
              <div
                key={section.id}
                className="rounded-2xl bg-white shadow overflow-hidden flex flex-col mb-6"
                style={{ borderLeft: `6px solid ${color}` }}
              >
                <div className="flex items-center justify-between px-6 pt-4 pb-2 cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="font-semibold text-[17px] text-black">{section.name}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); toggleSection(section.id); }}
                      className="focus:outline-none"
                    >
                      {expanded ? (
                        <ChevronUpIcon color={color} className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon color={color} className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={e => { e.stopPropagation(); handleDeleteSection(section.id); }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <DeleteIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {expanded && (
                  <div>
                    {section.items.map(item => (
                      <div key={item.id} className="flex items-center px-6 py-2">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => handleCheck(section.id, item.id)}
                          className="mr-3 w-4 h-4"
                          style={{ accentColor: color }}
                        />
                        {editingItem.sectionId === section.id && editingItem.itemId === item.id ? (
                          <input
                            className="flex-1 border-b border-gray-300 bg-transparent outline-none px-2 py-1 text-gray-700"
                            value={editingValue}
                            onChange={e => setEditingValue(e.target.value)}
                            onBlur={() => handleEdit(section.id, item.id, editingValue)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') handleEdit(section.id, item.id, editingValue);
                            }}
                            autoFocus
                          />
                        ) : (
                          <span
                            className="flex-1 font-normal text-[17px]"
                            style={{ color: '#00000075' }}
                          >
                            {item.text}
                          </span>
                        )}
                        <button
                          className="ml-2"
                          style={{ color }}
                          onClick={e => {
                            e.stopPropagation();
                            setEditingItem({ sectionId: section.id, itemId: item.id });
                            setEditingValue(item.text);
                          }}
                        >
                          <EditIcon className="h-4 w-4" color={color} />
                        </button>
                        <button className="ml-2 text-red-400 hover:text-red-600" onClick={e => { e.stopPropagation(); handleDelete(section.id, item.id); }}><DeleteIcon className="h-4 w-4" /></button>
                      </div>
                    ))}
                    <div className="flex items-center px-6 py-2">
                      <input
                        ref={el => addItemInputRefs.current[section.id] = el}
                        className="flex-1 border-none bg-transparent outline-none px-2 py-1 text-gray-400"
                        placeholder="add ..."
                        value={newItemText[section.id] || ''}
                        onChange={e => setNewItemText(prev => ({ ...prev, [section.id]: e.target.value }))}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleAddItem(section.id, newItemText[section.id]);
                        }}
                        onBlur={() => setNewItemText(prev => ({ ...prev, [section.id]: '' }))}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
        {showAddSection && (
          <div
            className="rounded-2xl bg-white shadow overflow-hidden flex flex-col mb-6  my-4 p-0"
            style={{ borderLeft: `6px solid ${['#7B61FF', '#197CAC', '#FFD600', '#3ABEFF', '#FF7A00', '#00C48C'][sections.length % 6]}` }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 px-6 pt-4 pb-4">
              <input
                ref={addSectionInputRef}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-transparent text-base"
                placeholder="Section name "
                value={newSectionName}
                onChange={e => setNewSectionName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddSection(); }}
              />
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 text-white font-medium rounded-lg transition-colors"
                  style={{ backgroundColor: ['#7B61FF', '#197CAC', '#FFD600', '#3ABEFF', '#FF7A00', '#00C48C'][sections.length % 6] }}
                >
                  Add Section
                </button>
                <button
                  onClick={() => { setShowAddSection(false); setNewSectionName(''); }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-8">
        <button className="bg-[#72D1FF] text-white px-8 py-2 rounded-full font-medium text-[20px] hover:bg-[#3ABEFF] transition font-poppins">Build trip</button>
      </div>
    </div>
  );
}

export default PackageList; 