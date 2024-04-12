import React, { useState } from 'react';

const InputField = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  console.log(inputValue);

  return (
    <input className='h-8 px-2 rounded-md' type="text" value={inputValue} onChange={handleInputChange} />
  );
}

export default InputField;
