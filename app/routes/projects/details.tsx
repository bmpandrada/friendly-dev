import type { Project, StrapiProject, StrapiResponse } from "~/types";
import type { Route } from "./+types/details";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export async function loader({request, params}:Route.LoaderArgs) {
    const { id } = params;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${id}&populate=*`);
    if(!res.ok) throw new Response('Fectch Failed Data', {status: 404});
    const json:StrapiResponse<StrapiProject> = await res.json();
    
    const item = json.data[0];

    const project: Project = {
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        url: item.url,
        category: item.category,
        featured: item.featured,
        date: item.date,
        image: item.image?.url
            ? `${item.image.url}`
            : '/images/no-image.png',
        }

    return {project}
}


const ProjectDetailsPage = ({loaderData}: Route.ComponentProps) => {
    const {project} = loaderData;

    return ( 
        <>
            <Link to={'/projects'} className="flex items-center text-blue-500 hover:text-blue-500 mb-6 transition"><FaArrowLeft className="mr-2" />Back to Projects</Link>
            <div className="grid gap-8 md:grid-cols-2 items-center">
                <div>
                    <img src={project.image} alt="" className="w-full rounded-lg shadow-md" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-blue-400 mb-4">
                        {project.title}
                    </h1>
                    <p className="text-gray-300 text-sm mb-4">
                        {new Date(project.date).toLocaleDateString()} ● {project.category}
                    </p>
                    <p className="text-200 mb-6">{project.description}</p>
                    <a href={project.url} target="_blank" className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition">View Project ➤</a>
                </div>
            </div>
        </>
     );
}
 
export default ProjectDetailsPage;