import React, { useState, useRef, useEffect } from 'react';

function TravelMatesSection({ invitedFriends, handleAddFriend, handleRemoveFriend }) {
  function InviteFriendInput({ onAdd }) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
      if (editing && inputRef.current) {
        inputRef.current.focus();
      }
    }, [editing]);

    function handleBlur() {
      setEditing(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Enter" && value.trim()) {
        onAdd(value.trim());
        setValue("");
        setEditing(false);
      }
    }

    return editing ? (
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
            <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
          </svg>
        </span>
        <input
          ref={inputRef}
          className="border border-gray-200 rounded-lg px-3 py-1 text-gray-700 bg-white focus:outline-none"
          placeholder="Type a name or email..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </div>
    ) : (
      <button
        className="flex items-center gap-2 mb-2 focus:outline-none"
        onClick={() => setEditing(true)}
      >
        <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
            <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
          </svg>
        </span>
        <span className="text-gray-400 font-normal">Invite new friend ...</span>
      </button>
    );
  }

  return (
    <div className="mb-12 flex">
      <div className="flex-1">
        <div className="text-[24px] font-semibold mb-6" style={{ color: '#197CAC' }}>Travel Mates</div>
        <InviteFriendInput onAdd={handleAddFriend} />
        <div className="flex flex-wrap gap-2 mt-2">
          {invitedFriends.map(friend => (
            <div key={friend} className="flex items-center bg-[#F3F3F3] rounded-full px-3 py-1 text-gray-700">
              <span className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                <svg width="18" height="18" fill="none" viewBox="0 0 22 22">
                  <circle cx="11" cy="7" r="4" fill="#C4C4C4" />
                  <ellipse cx="11" cy="16.5" rx="7" ry="4.5" fill="#C4C4C4" />
                </svg>
              </span>
              <span className="mr-1">{friend}</span>
              <button onClick={() => handleRemoveFriend(friend)} className="ml-1 text-gray-400 hover:text-red-500 focus:outline-none">&times;</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelMatesSection; 