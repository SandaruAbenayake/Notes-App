import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <NoteCard
            title="Shopping List"
            date="2025-05-03"
            content="Buy milk, eggs, and bread from the supermarket..."
            tags={["groceries", "urgent"]}
            isPinned={false}
            onEdit={() => console.log("Edit note")}
            onDelete={() => console.log("Delete note")}
            onPinNote={() => console.log("Pin/unpin note")}
          />
           
          {/* You can add more <NoteCard /> components here */}
        </div>
      </div>

<button className ="" onClick={() => {}}></button>

    </>
  );
};

export default Home;
