import React from 'react';
import { getInitial } from '../../utils/helper';

const Profileinfo = ({ onLogout }) => {
  return (
    <div className="flex items-center space-x-3">
      {/* Profile initials or avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
        {getInitial("Maggonage Sandaru Nilmantha Abenayake")}
      </div>

      {/* Name and logout */}
      <div className="flex flex-col">
        <p className="text-sm font-medium text-black">Sandaru</p>
        <button
          className="text-xs text-slate-700 hover:underline mt-1"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profileinfo;
