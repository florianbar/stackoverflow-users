interface ErrorAlertProps {
    children: React.ReactNode;
    type?: "danger" | "info";
};

const ErrorAlert = ({ 
    children, 
    type = "info" 
}: ErrorAlertProps) => {
    let alertTypeClasses = "";
    switch (type) {
        case "danger":
            alertTypeClasses = "bg-red-100 text-red-600";
            break;
        case "info":
        default:
            alertTypeClasses = "bg-blue-100 text-blue-600";
    }

    return (
        <p className={`mb-4 px-4 py-3 text-sm font-medium rounded-xl ${alertTypeClasses}`}>
            {children}
        </p>
    );
};

export default ErrorAlert;