import type React from "react";

type PaginationProps = {
    totalPages: number,
    currentPage: number,
    onPageChange: (page:number)=>void
}

const Pagination:React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    if(totalPages <= 1 ) return null;
    return ( 
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({length: totalPages}, (_, ibtn)=>(
                <button 
                    key={ibtn + 1} 
                    onClick={()=> onPageChange(ibtn + 1)}
                    className={`px-3 py-1  cursor-pointer rounded
                     ${currentPage === ibtn + 1 ? 'bg-blue-600 text-white' : 'bg-blue-700 text-gray-200'}`}>
                        {ibtn + 1}
                     </button>
            ))}
        </div>
     );
}
 
export default Pagination;