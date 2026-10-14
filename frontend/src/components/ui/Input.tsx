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
        <label className="block  text-sm font-medium text-gray-700">
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
         className="w-120 h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:border-blue-500 transition-colors"
        />

    </div>
  )
}