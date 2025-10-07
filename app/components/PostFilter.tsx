type PostFilterProps = {
    searchQuery: string,
    onSearchChange: (value: string)=> void
}

const PostFilter = ({ searchQuery, onSearchChange }: PostFilterProps) => {
    return ( 
        <div className="mb-6">
            <input  
                    onChange={(e)=>onSearchChange(e.target.value)}
                    value={searchQuery}
                    placeholder="Search Post..."
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-blue-500" />
        </div>
     );
}
 
export default PostFilter;