const WelcomeLoader = () => {
    return ( 
        <div
            className="flex flex-col items-center justify-center h-screen bg-slate-800 text-gray-200 transition-opacity duration-700"
            role="status"
            aria-label="Loading content..."
        >
            <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-lg font-medium tracking-wide">
                Welcome to <span className="font-semibold text-blue-500">The Friendly Dev</span>
            </p>
            </div>
            <p className="text-sm text-gray-400 mt-2 animate-pulse">Loading your experience...</p>
        </div>
     );
}
 
export default WelcomeLoader;