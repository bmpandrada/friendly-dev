
import type { Post, StrapiResponse, StrapiPost } from "~/types";
import type { Route } from "./+types";
import PostCard from "~/components/PostCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";

export async function loader({request}:Route.LoaderArgs):Promise<{posts:Post[]}> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`);

    if(!res.ok) throw new Error('Failed to fetch data');

    const json:StrapiResponse<StrapiPost> = await res.json();

    const posts = json.data.map((item)=> ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        body: item.body,
        date: item.date,
        image: item.image?.url
            ? `${item.image.url}`
            : '/images/no-image.png',
    }))

    return {posts}
}

const BlogPage = ({loaderData}:Route.ComponentProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const postPerPage = 10;

    const  { posts } = loaderData;

    const filtedPosts = posts.filter((post)=>{
        const query = searchQuery.toLocaleLowerCase();
        return (
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query)
        )
    })
    
    const totalPages = Math.ceil(filtedPosts.length / postPerPage);

    const indexOfLast = currentPage * postPerPage;
    const indexOfFirst = indexOfLast - postPerPage;

    const currentPost = filtedPosts.slice(indexOfFirst, indexOfLast)
   
    return ( <div className="max-w-3xl mx-auto px-6 py-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-white mb-8">
           ✍️ Blog
        </h2>
        <PostFilter searchQuery={searchQuery} onSearchChange={(query)=>{setSearchQuery(query); setCurrentPage(1)}}/>
        
        <div className="space-y-8">
            {currentPost.length === 0 
            ?
            (<p className="text-gray-400 text-center">No posts found</p>) 
            : (
            currentPost.map((post)=>(
                <PostCard key={post.slug} post={post} />
            )) 
            ) }
        </div>
        
     
        {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page)=>setCurrentPage(page)} />
        )}
    </div> );
}
 
export default BlogPage;