import { getPosts } from "@/app/utils/utils";
import { Column, Flex, SmartLink, Text } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import styles from "./Projects.module.scss";

interface ProjectsProps {
  range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l" className={styles.container}>
      {displayedProjects.map((post, index) => (
        <Flex position="relative" key={post.slug} className={styles.hover}>
          <ProjectCard
            priority={index < 2}
            href={`work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={
              post.metadata.team?.map((member) => ({ src: member.avatar })) || []
            }
            link={post.metadata.link || ""}
            hostedsite={post.metadata.hostedsite || ""}
            stack={post.metadata.stack || ""}
            features={post.metadata.features || []}
          />
          <SmartLink
            className={`${styles.viewDetails}`}
            style={{
              position: "absolute",
              bottom: "40px",
              right: "40px",
              zIndex: 10,
              background: "var(--neutral-background-strong)",
              padding: "8px 16px",
              borderRadius: "var(--radius-l)",
              border: "1px solid var(--neutral-border-medium)",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
            href={`work/${post.slug}`}
            unstyled
          >
            <Text variant="body-default-s">View Details</Text>
          </SmartLink>
        </Flex>
      ))}
    </Column>
  );
}