
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
            px-6
            py-3
            rounded-2xl
            bg-[#2D99AE]
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
