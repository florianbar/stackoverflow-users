interface ErrorAlertProps {
    children: React.ReactNode;
};

const ErrorAlert = ({ children }: ErrorAlertProps) => {
    return (
        <p className="mb-2 px-4 py-3 bg-red-100 text-red-800 rounded-xl">
            {children}
        </p>
    );
};

export default ErrorAlert;