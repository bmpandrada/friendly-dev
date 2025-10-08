 import FeaturedProjects from "~/components/FeaturedProject";
import type { Route } from "./+types/index";
import type { PostMeta, Project } from "~/types";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPost";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Portfolio website development" },
  ];
}

export async function loader({request}:Route.LoaderArgs):Promise<{projects:Project[]; posts: PostMeta[]}> {
  const url = new URL(request.url);
  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(new URL('/posts-meta.json', url))
  ]);

  if(!projectRes || !postRes) {
    throw new Error("Failed to fetch project or posts");
  }

  const  [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json()
  ]);

  return { projects, posts }
}

const HomePage = ({loaderData}:Route.ComponentProps) => {
  const { projects, posts } = loaderData as {projects:Project[], posts: PostMeta[]};

  return (<>
  <FeaturedProjects projects={projects} count={2}/>
  <AboutPreview />
  <LatestPosts posts={posts}  limit={3} />
  </>);
}
export default HomePage;