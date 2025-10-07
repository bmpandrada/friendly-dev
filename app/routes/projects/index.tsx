import type { Project } from "~/types";
import type { Route } from "./+types/index";
import ProjectCard from "~/components/PojectCard";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "motion/react"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Projects" },
    { name: "description", content: "My website project Portfolio" },
  ];
}

export async function loader({request}: Route.LoaderArgs):Promise<{projects:Project[]}> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    if(!res.ok) throw new Response('Failed to Fetch Data', {status: 404});
    const data = await res.json();
    return { projects: data }
}

const ProjectPage = ({loaderData}:Route.ComponentProps) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const projectPerPage = 10;
    
    const { projects } = loaderData as {projects:Project[]}

    //get unique categories
    const categories = ['All', ...new Set(projects.map((item)=> item.category))];

  
    //filter project base on the category
    const filterProjects =  selectedCategory === 'All' ? projects : projects.filter((item)=> item.category === selectedCategory) 

    // Calculate total pages
    const totalPages = Math.ceil(filterProjects.length / projectPerPage);

    //get the current pages of projects
    const indexOfLast = currentPage * projectPerPage;
    const indexOfFirst = indexOfLast - projectPerPage;

    //display the project
    const currentProjects = filterProjects.slice(indexOfFirst, indexOfLast)
  
    return ( <>
        <h2 className="text-3xl font-bold text-white mb-8">
           🚀 Projects 
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category)=>(
                <button key={category} onClick={()=>{setSelectedCategory(category); setCurrentPage(1)}}
                className={`px-3 py-2 rounded text-sm ${selectedCategory === category ? 'bg-blue-600 text-white' :  'bg-gray-700 text-gray-200'}`}>
                    {category}
                </button>
            ))}
        </div>
        <AnimatePresence mode='wait'>
        <motion.div layout transition={{ duration: 0.3 }} className="grid sm:grid-cols-2 gap-6">
            {currentProjects.map((project)=> (
                <motion.div key={project.id} layout>
                <ProjectCard project={project} key={project.id} />
                </motion.div>
            ))}
        </motion.div>
        </AnimatePresence>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </> );
}
 
export default ProjectPage;