interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
};

const Button = ({ 
    children,
    type = "button",
    onClick
}: ButtonProps) => {
    return (
        <button 
            type={type}
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-1 px-4 rounded-full"
        >
            {children}
        </button>
    );
};

export default Button;