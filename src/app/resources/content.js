import { InlineCode } from "@/once-ui/components";
import styles from "@/components/about/about.module.scss";

const person = {
  firstName: "Christopher",
  lastName: "Ng",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  location: "America/Vancouver", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Cantonese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const callletter = {
  display: true,
  title: <>Schedule a call with {person.firstName}</>,
  description: <>Avaliable on Discord, Google Meet, and Cal Video. </>,
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/ChrisnNg",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/christopherkyleng/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:christopherkyleng@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi, My name is Christopher</>,
  subline: (
    <>
      I am a product focused <InlineCode>Software Engineer</InlineCode> with
      four years of experience. I'm recognized for my tenacity and ability to
      solve problems and I love to build secure, reliable, and user friendly web
      applications that can scale.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/christopherkyleng",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi, My name is Chris I am a product focused software engineer with four
        years of experience. I'm recognized for my tenacity and ability to solve
        problems and I love to build secure, reliable, and user friendly web
        applications that can scale.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Broadridge Financial Solutions",
        timeframe: "Feb 2020 - Jun 2023",
        role: "Associate Software Engineer",
        achievements: [
          <>
            Developed a proof-of-concept application that secured a contract
            with a top global industry leader generating millions in revenue.
          </>,
          <>
            Spearheaded streamlining deployment processes to reduce production
            deployment errors to zero. Saving one hundred combined team hours
            per error prevented.
          </>,
          <>
            Interviewed and trained 8 team members while documenting knowledge
            to streamline the onboarding procedures.
          </>,
          <>
            Updated hundreds of thousands of production records with strict
            criteria to modernize specifically targeted data records. Kept
            client data consistent with new and incoming data records so systems
            could be streamlined to accept data types with fewer variety.
          </>,
          <>
            Investigated and resolved critical system problems and real-time
            production issues to maintain client trust and expectations.
          </>,
          <>
            Researched, developed, and tested new products, system enhancements
            and defects to expand services and capabilities.
          </>,
          <>
            Designed and improved User interfaces and APIs after proactively
            engaging clients for feedback.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.gif",
          //   alt: "Scheduler Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of British Columbia",
        description: <>Psychology</>,
      },
      {
        name: "Lighthouse Labs",
        description: (
          <>
            An intensive 12-week full-course bootcamp to develop full-stack
            skills
          </>
        ),
      },
      {
        name: "Harvard University",
        description: (
          <>CS50 Harvard's Introduction to Computer Science and Programming</>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: (
          <>
            Javascript, HTML, CSS, Python, Golang, Ruby, C, SQL, SASS,
            Shellscript, Batch Script, JSX, Markdown
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        // images: [
        //   {
        //     src: "/images/projects/project-01/cover-01.gif",
        //     alt: "Project image",
        //     width: 16,
        //     height: 9,
        //   },
        //   {
        //     src: "/images/projects/project-02/cover-01.gif",
        //     alt: "Project image",
        //     width: 16,
        //     height: 9,
        //   },
        // ],
      },
      {
        title: "Frameworks",
        description: (
          <>React.js, Next.js, Express.js, Node.js, Vue.js, Jquery, Bootstrap</>
        ),
      },
      {
        title: "Testing Suites",
        description: (
          <>
            Storybook, Jest, Cypress, Capybara, Poltergeist, Selenium, Mocha,
            PhantomJS
          </>
        ),
      },
    ],
  },
  projects: {
    display: true, // set to false to hide this section
    title: "Projects",
    project: [
      {
        title: "",
        description: (
          <>
            <a href="/work" className={styles.fancyFont}>
              Full overview
            </a>
          </>
        ),
        images: [
          {
            src: "/images/projects/project-01/cover-01.gif",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-02/cover-01.gif",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-03/cover-01.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-04/cover-01.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-05/cover-01.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-06/cover-01.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-07/cover-01.png",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpeg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  blog,
  work,
  gallery,
  callletter,
};
