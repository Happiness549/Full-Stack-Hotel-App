import React, { type ChangeEvent } from 'react'
interface InputProps{
  label?: string;
    type?: string;
    placeholder: string;
    value?: string;
    onChange?:(e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    name?: string;
    
    
}

export const Input:React.FC<InputProps> = ({type, placeholder, value, onChange,name,label,className=''}) => {
  return (
      <div className={`w-full ${className}`}>  
       {label && (
        <label className="block  text-sm  ">
          {label}
        </label>
      )}
        <input 
        name={name}
          type= {type} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
         className="w-80 h-7 px-4 rounded-md border border-gray-300 outline-none focus:border-[#7E9E85]/40 0 transition-colors"
        />

    </div>
  )
}