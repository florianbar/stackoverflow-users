interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick: () => void;
    buttonType?: "primary" | "success" | "danger";
};

const Button = ({ 
    children,
    type = "button",
    onClick,
    buttonType = "primary"
}: ButtonProps) => {
    let buttonTypeClasses = "";
    switch (buttonType) {
        case "danger":
            buttonTypeClasses = "bg-red-400 hover:bg-red-500 text-white";
            break;
        case "success":
            buttonTypeClasses = "bg-green-500 hover:bg-green-600 text-white";
            break;
        case "primary":
        default:
            buttonTypeClasses = "bg-gray-400 hover:bg-gray-500 text-white";
    }

    return (
        <button 
            type={type}
            onClick={onClick}
            className={`font-bold text-xs px-3 py-1 rounded-full ${buttonTypeClasses}`}
        >
            {children}
        </button>
    );
};

export default Button;