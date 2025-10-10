export type Project = {
    id: string,
    title: string,
    description: string,
    image: string,
    url: string,
    date: string,
    category: string,
    featured: boolean,
    documentId: string
};

export type Post = {
    id: string,
    slug: string,
    title: string,
    excerpt: string,
    date:string,
    image:string,
    body: string,
};


export type StrapiResponse<T> = {
    data: T[],
};

export type StrapiProject = {
    id: string,
    title: string,
    description: string,
    image?: {
        url:string, 
        formats?:{
        thumbnail?: {url:string};
        medium?: {url:string};
        small?: {url:string};
        large?: {url:string};
    }} ,
    url: string,
    date: string,
    category: string,
    featured: boolean,
    documentId: string
};


export type StrapiPost = {
    id: string,
    title: string,
    slug: string,
    excerpt: string,
    image?: {
        url:string, 
        formats?:{
        thumbnail?: {url:string};
        medium?: {url:string};
        small?: {url:string};
        large?: {url:string};
    }} ,
    date: string,
    body: string,
    documentId: string
};