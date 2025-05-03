import React, { useState } from "react";
import AddEditNotes from "../components/AddEditNotes";

const NotesPage = () => {
  const [openAndEditModal, setOpenAndEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div>
      <button
        onClick={() => setOpenAndEditModal(true)}
        className="btn-primary"
      >
        Add Note
      </button>

      {openAndEditModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
          onClick={() => setOpenAndEditModal(false)} // Close on outside click
        >
          <div
            className="bg-white rounded-lg p-6 z-50 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
          >
            <AddEditNotes
              noteData={selectedNote}
              type="add"
              onclose={() => setOpenAndEditModal(false)} // Close on top-right button
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
