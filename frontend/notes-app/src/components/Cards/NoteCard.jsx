import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-xl border border-slate-200 shadow-md p-5 hover:shadow-lg transition-all">
      
      {/* Top Row: Title + Pin */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">{date}</p>
        </div>
        <button onClick={onPinNote} title={isPinned ? "Unpin" : "Pin"}>
          <MdOutlinePushPin
            className={`text-xl hover:scale-110 transition-transform ${
              isPinned ? "text-yellow-500" : "text-slate-400"
            }`}
          />
        </button>
      </div>

      {/* Note Content */}
      <p className="text-sm text-slate-700 mb-3 line-clamp-3">
        {content || "No content available"}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {(Array.isArray(tags) ? tags : []).map((tag, index) => (
          <span
            key={index}
            className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button onClick={onEdit} title="Edit">
          <MdCreate className="text-lg text-slate-600 hover:text-green-600 transition-colors" />
        </button>
        <button onClick={onDelete} title="Delete">
          <MdDelete className="text-lg text-slate-600 hover:text-red-600 transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
