import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // using icons (optional)

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] rounded px-4 py-2 mb-3 w-full">
      <input
        type={isShowPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter password"}
        className="flex-1 bg-transparent outline-none text-sm text-black"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="ml-2 text-gray-500 hover:text-gray-700"
      >
        {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
