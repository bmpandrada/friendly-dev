 import FeaturedProjects from "~/components/FeaturedProject";
import type { Route } from "./+types/index";
import type { Post, Project, StrapiPost, StrapiProject, StrapiResponse } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPost";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Portfolio website development" },
  ];
}

export async function loader({request}:Route.LoaderArgs):Promise<{projects:Project[]; posts: Post[]}> {
  const url = new URL(request.url);
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
  ]);

  if(!projectRes || !postRes) {
    throw new Error("Failed to fetch project or posts");
  }

  const projectJson: StrapiResponse<StrapiProject> = await projectRes.json();
  const postJson:StrapiResponse<StrapiPost> = await postRes.json();

  const projects = projectJson.data.map((item)=>({
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
  }))

   const posts = postJson.data.map((item)=>({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        slug: item.slug,
        body: item.body,
        excerpt: item.excerpt,
        date: item.date,
        image: item.image?.url
            ? `${item.image.url}`
            : '/images/no-image.png',
  }))

  return { projects, posts }
}

const HomePage = ({loaderData}:Route.ComponentProps) => {
  const { projects, posts } = loaderData as {projects:Project[], posts: Post[]};

  return (<>
  <FeaturedProjects projects={projects} count={2}/>
  <AboutPreview />
  <LatestPosts posts={posts}  limit={3} />
  </>);
}
export default HomePage;