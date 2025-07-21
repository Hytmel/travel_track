import React, { useState } from 'react';

const TextInput = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-0 border-b border-gray-400 focus:border-[#197CAC] focus:ring-0 focus:outline-none text-base py-2 bg-transparent placeholder:text-gray-400 placeholder:font-poppins font-poppins"
        {...props}
      />
      {showPasswordToggle && (
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#197CAC]"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
          aria-label="Show password"
        >
          {showPassword ? props.EyeOffIcon : props.EyeIcon}
        </button>
      )}
    </div>
  );
};

export default TextInput; 