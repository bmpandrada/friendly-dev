const AboutPage = () => {
  return (
    <div className='max-w-5xl mx-auto px-6 py-16 bg-gray-900'>
      {/* Intro */}
      <div className='flex flex-col md:flex-row md:items-start items-center gap-10 mb-12'>
        <img
          src='/images/profile.jpg'
          alt='profile'
          className='w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md'
        />
        <div>
          <h1 className='text-3xl font-bold text-white mb-2'>
            Hey, I'm Bruce 👋
          </h1>
          <p className='text-gray-300 text-lg'>
            I am Bruce Michael Andrada, a passionate Frontend Web Developer with nearly 2 years of professional experience building responsive and interactive web applications. 
            I specialize in React.js, Next.js, React Router Framework, Tailwind CSS, Sass, and Framer Motion, with solid experience in state management (Context API) and handling CRUD operations with REST APIs. 
            I also apply basic TypeScript in my projects for better code maintainability.
               <br />  <br />
            I am continuously learning new tools and frameworks to expand my skill set and eventually transition into a full-stack developer role.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className='mb-12'>
        <h2 className='text-2xl font-semibold text-white mb-4'>My Mission</h2>
        <p className='text-gray-300 leading-relaxed'>
          My mission is to build efficient and scalable web solutions that provide excellent user experiences.
          I aim to collaborate with teams in delivering high-quality applications while continuously learning and adapting to new technologies, 
          with a long-term goal of becoming a well-rounded full-stack developer.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className='text-2xl font-semibold text-white mb-4'>🚀 Tech I Use</h2>
      <ul className='flex flex-wrap gap-4 text-sm text-gray-300'>
        {[
          'React',
          'Next.js',
          'Tailwind CSS',
          'Sass',
          'Node.js',
          'Strapi',
          'MongoDB',
          'JWT',
          'TypeScript',
          'PostgreSQL',
          'TanStack',
          'PostAPI',
        ].map((tech) => (
          <li key={tech} className='bg-gray-700 px-3 py-1 rounded-md'>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
