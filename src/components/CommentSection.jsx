import React, { useState } from 'react';
import { DeleteIcon, DateIcon } from './Icons';

function CommentSection({
  comments = [],
  user,
  color = { label: '#197CAC' },
  dayId,
  onAddComment,
  onDeleteComment,
  onClose,
  sending = false,
}) {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="p-0 mb-4">
      {/* Comments Header (replaces day header) */}
      <div className="flex items-center mb-6 px-6 pt-6">
        <button
          className="mr-3 text-2xl font-bold focus:outline-none"
          style={{ color: color.label }}
          onClick={onClose}
        >
          &larr;
        </button>
        <span className="text-xl font-bold font-poppins mr-3" style={{ color: color.label }}>Comments</span>
        <DateIcon className="h-5 w-5 mr-2" style={{ color: color.label }} />
        {/* You can add a date prop if needed */}
      </div>
      {/* Only display the latest comments for this day */}
      <div className="space-y-4 mb-6 px-6">
        {(comments || []).map(comment => (
          <div key={comment.id} className="bg-white rounded-xl p-4 flex items-start justify-between shadow border border-gray-100">
            <div className="flex items-start gap-3">
              <img src={comment.user.avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-600 font-poppins">{comment.user.name}</div>
                <div className="text-gray-400 font-poppins mt-1">{comment.message}</div>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700 ml-4"
              onClick={() => onDeleteComment(dayId, comment.id)}
              aria-label="Delete comment"
            >
              <DeleteIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
      {/* Add Comment Input */}
      <div className="mt-4 px-6 pb-6">
        <div className="bg-white border border-gray-100 rounded-xl p-2 shadow flex flex-col gap-2">
          <div className="flex flex-row items-center gap-3">
            <img src={user?.avatar || 'https://www.gravatar.com/avatar/?d=mp&f=y'} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            <div className="font-normal text-gray-600 font-poppins text-base">{user?.name || 'Anonymous'}</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <textarea
              className="rounded-xl px-4 py-1 font-poppins text-gray-700 focus:outline-none bg-white flex-1 border-none resize-none"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              rows={1}
            />
            <button
              className="w-24 h-10 rounded-full border border-red-400 text-red-400 font-poppins font-medium hover:bg-red-50 transition flex items-center justify-center"
              onClick={() => { setNewComment(''); onClose && onClose(); }}
            >
              cancel
            </button>
            <button
              className="w-24 h-10 rounded-full bg-[#3ABEFF] text-white font-poppins font-medium hover:bg-[#197CAC] transition flex items-center justify-center"
              onClick={() => { if (onAddComment) { onAddComment(dayId, newComment, setNewComment); } }}
              disabled={sending || !newComment.trim()}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentSection; 