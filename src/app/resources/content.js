import { InlineCode, Kbd } from "@/once-ui/components";
import styles from "@/components/about/about.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

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
      solve problems, and I love to build secure, reliable, and user friendly web
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
        Hi, My name is Chris. 
        <br/>
        I am a product focused software engineer with four
        years of experience. I'm recognized for my tenacity and ability to solve
        problems, and I love to build scalable, secure, reliable, and user friendly web
        applications.
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
        role: "Software Engineer",
        achievements: [
          <>
            Developed a proof-of-concept application that secured a contract
            with a top global industry leader generating millions in revenue.
          </>,
          <>
            Spearheaded a zero-error deployment initiative by redesigning CI/CD workflows, eliminating production issues and saving 100+ team hours per incident prevented.
          </>,
          <>
            Scaled team efficiency by hiring, training, and documenting onboarding for 8 new members, reducing ramp-up time. 
          </>,
          <>
            Migrated and standardized 100K+ production records, ensuring data consistency and enabling streamlined system integration. 
          </>,
          <>
            Resolved critical system issues in real-time, maintaining 100% uptime and client trust in high-stakes environments. 
          </>,
          <>
            Researched and developed new products/enhancements, expanding service capabilities and reducing defect rates. 
          </>,
          <>
            Redesigned user interfaces and APIs based on direct client feedback, improving usability and adoption. 
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
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        description: (
          <>
            Javascript, HTML, CSS, Python, Golang, Ruby, C, SQL, SASS, Shellscript, Batch Script, JSX, Markdown
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
        title: "Developer Tools",
        description: (
          <> Git, VSCode, Agile, Linux, Heroku, CI/CD Pipeline, PostgreSQL</>
        ),
      },
      {
        title: "Testing Suites",
        description: (
          <>
            Storybook, Jest, Cypress, Capybara, Poltergeist, Selenium, Mocha, PhantomJS
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
            <a className={styles.stripped} href="/work"> 
              <Kbd className={styles.kbdoverview}> <FontAwesomeIcon icon={faExpand} />  Full overview</Kbd>
            </a>
          </>
        ),
        images: [
          {
            src: "/images/projects/project-01/cover-01.gif",
            alt: "Scheduler",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-02/cover-01.gif",
            alt: "Cat_park",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-03/cover-01.png",
            alt: "Leaguesearch.gg",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-04/cover-01.png",
            alt: "Junglerails",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-05/cover-01.png",
            alt: "Miso list",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-06/cover-01.png",
            alt: "Tweeter",
            width: 19.6,
            height:10,
          },
          {
            src: "/images/projects/project-07/cover-01.png",
            alt: "Amprofy",
            width: 19.6,
            height:10,
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
  label: "Projects",
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
      src: "/images/gallery/img-03.jpeg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
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
