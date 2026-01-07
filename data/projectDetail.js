const projectData = [
    {
        id: "echonote",
        index: 1,
        title: "EchoNote",
        image: "images/echonote.png",
        description: "A sophisticated journaling platform designed for self-reflection and personal growth. Built with Next.js 15, it features secure authentication, AI-powered protection, and interactive analytics to track mood patterns over time. The interface follows a premium \"Earthy Elegance\" design language.",
        techStack: [
            "Next.js 15",
            "Clerk Auth",
            "Prisma & PostgreSQL",
            "Tailwind CSS",
            "Arcjet Security"
        ],
        links: {
            github: "https://github.com/monarch-009/echonote",
            live: "https://echonote-app.vercel.app/"
        }
    },
    {
        id: "friendskit",
        index: 2,
        title: "Friendskit",
        image: "images/Friendkit.png",
        description: "Developed a comprehensive social platform that connects people and facilitates meaningful interactions. Features include user profiles, messaging, content sharing, and community building tools.",
        techStack: [
            "Next.js",
            "React",
            "MongoDB",
            "Firebase",
            "Tailwind"
        ],
        links: {
            github: "https://github.com/monarch-009/friendskit",
            live: "https://friendskit.vercel.app/"
        }
    },
];

// Export for usage
if (typeof window !== 'undefined') {
    window.projectData = projectData;
} else if (typeof module !== 'undefined') {
    module.exports = projectData;
}
