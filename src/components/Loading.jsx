function Loading() {



    return (
        <div className="p-6 flex justify-center items-center text-gray-500 mt-40">
            <svg className="animate-spin h-5 w-5 mr-2 text-[#7C9B75]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            載入中...
        </div>
    );
};

export default Loading; 