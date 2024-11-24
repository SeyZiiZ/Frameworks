import { useState } from "react";

export const InputUser = ({ value, placeholder, onInputChange}) => {
    let [userText, setUserText] = useState('');

    function handleUserChange(event) {
        const newValue = event.target.value;
        setUserText(newValue);
        onInputChange(newValue);
    }
    
    return (
    <>
        <input 
            type="text" 
            placeholder={placeholder} 
            value={value}
            className ="
                w-full 
                max-w-md 
                px-4 
                py-3 
                text-gray-700 
                border-2 
                border-gray-300 
                rounded-lg 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:border-blue-500 
                transition-all 
                duration-300 
                hover:border-gray-400 
                placeholder-gray-400
            "
            onChange={handleUserChange}
        />
    </>
    );
};