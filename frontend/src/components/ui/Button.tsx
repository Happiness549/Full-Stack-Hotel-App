
interface ButtonProps{
    text: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    id?: string;
}

export const Button:React.FC<ButtonProps> = ({text,onClick,className}) => {
  return (
    <div>
        <button
        
        
        onClick={onClick}
        className={`
           w-80 
           h-10
            rounded-md
            bg-[#7E9E85]
            text-white
            font-semibold
            shadow-md
            hover:bg-[#9ECAE1]
            transition
            duration-300
            cursor-pointer
            ${className || ''}
            `}
        
        >
            {text}
        
        </button>   
    </div>
  )
}
