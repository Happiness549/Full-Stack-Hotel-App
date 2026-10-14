import React, { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge';

interface CardProps{
  children: ReactNode;
  className?: string;
}

export const Card : React.FC<CardProps> = ({children,className}) => {
  return (
    <div className={twMerge('rounded-4xl  p-6  border border-white/10   shadow-[0_4px_30px_rgba(0,0,0,0.5),_0_1px_3px_rgba(255,255,255,0.1),_0_20px_40px_rgba(99,102,241,0.12)] ', 
    className )}>
        {children}
        
    </div>
  )
}