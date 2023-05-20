const itemCount = 8; // Or something else

const EmptyList = () => {
    return (
        <div>
            {[...Array(itemCount)].map(() => {
                return (
                    <div className="relative mb-2 p-3 pr-10 cursor-pointer h-[75px] rounded-2xl border bg-gray-100 border-gray-100" />
                );
            })}
        </div>
    );
};

export default EmptyList;