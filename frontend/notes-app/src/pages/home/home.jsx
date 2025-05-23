import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openAndEditModel, setOpenAndEditModal] = useState({
    isShown: false,
    type: "add",
    date: null,
  });

  const [userInfo,setUserInfo] = useState(null);

  const navigate = useNavigate();  


  // //Get User Info
  const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get("/get-user");
    if (response.data && response.data.user) {
      setUserInfo(response.data.user);
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      navigate("/login");
    }
  }
};

useEffect(()=> {

  getUserInfo();
  return ()=> {

  }
},[])


  return (
    <>
      <Navbar userInfo={userInfo}/>

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

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAndEditModal({ isShown: true, type: "add", date: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAndEditModel.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[80%] max-h-3/4 bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
      >
        <AddEditNotes 
        type={openAndEditModel.type}
        noteData={openAndEditModel.data}
        onclose={() => setOpenAndEditModal({isShown:false,type:"add",data:null})} />
      </Modal>
    </>
  );
};

export default Home;
