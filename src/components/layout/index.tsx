interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="mx-auto max-w-lg px-4 sm:px-0">
            {children}
        </div>
    );
};

export default Layout;
