import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

interface PaginationProps {
    pageNumber: number;
    usersLoading: boolean;
    prevPage: () => void;
    nextPage: () => void;
};

const Pagination = ({pageNumber, usersLoading, prevPage, nextPage}: PaginationProps) => {
    return (
        <div className="flex items-center space-x-3 justify-center my-4">
            <button 
                type="button"
                disabled={usersLoading}
                onClick={prevPage}
                className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            >
                <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <div>Page {pageNumber}</div>
            <button 
                type="button"
                disabled={usersLoading}
                onClick={nextPage}
                className="bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center"
            >
                <ChevronRightIcon className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Pagination;