import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
  RevealFx
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import React from "react";

export async function generateMetadata() {
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/about`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.projects.title,
      display: about.projects.display,
      items: about.projects.project.map((project) => project.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:")) // Filter out empty links and email links
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon
                  paddingLeft="12"
                  name="calendar"
                  onBackground="brand-weak"
                />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <>
                        <Button
                          className="s-flex-hide"
                          key={item.name}
                          href={item.link}
                          prefixIcon={item.icon}
                          label={item.name}
                          size="s"
                          variant="secondary"
                        />
                        <IconButton
                          className="s-flex-show"
                          size="l"
                          key={`${item.name}-icon`}
                          href={item.link}
                          icon={item.icon}
                          variant="secondary"
                        />
                      </>
                    )
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="m"
            >
              <RevealFx
                translateY={5}
                fillWidth
                horizontal="start"
              >
                {about.intro.description}
              </RevealFx>
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={about.work.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                <RevealFx
                  translateY={5}
                  fillWidth
                  horizontal="start"
                  delay={0.5}
                >
                  {about.work.title}
                </RevealFx>
              </Heading>
              <Column fillWidth gap="l">
                {about.work.experiences.map((experience, index) => (
                  <Column
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                  >
                    <Flex
                      fillWidth
                      horizontal="space-between"
                      vertical="end"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        <RevealFx
                          translateY={5}
                          fillWidth
                          horizontal="start"
                          delay={1}
                        > 
                          {experience.company}
                        </RevealFx>
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        <RevealFx
                          translateY={5}
                          fillWidth
                          horizontal="start"
                          delay={0.75}
                        > 
                        {experience.timeframe}
                        </RevealFx>
                      </Text>
                    </Flex>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      <RevealFx
                        translateY={5}
                        fillWidth
                        horizontal="start"
                        delay={1}
                      > 
                        {experience.role}
                      </RevealFx>
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.JSX.Element, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                            className={styles.bulletpoints}
                          >
                            <RevealFx
                              translateY={5}
                              fillWidth
                              horizontal="center"
                              delay={1 + index/3}
                            > 
                              {achievement}
                            </RevealFx>
                          </Text>
                        )
                      )}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" wrap>
                        {experience.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                <RevealFx
                  translateY={5}
                  fillWidth
                  horizontal="start"
                  delay={3.5}
                  > 
                    {about.studies.title}
                  </RevealFx>
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                  >
                    <Text id={institution.name} variant="heading-strong-l">
                      <RevealFx
                          translateY={5}
                          fillWidth
                          horizontal="start"
                          delay={3.6}
                      > 
                        {institution.name}
                      </RevealFx>
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        <RevealFx
                        translateY={5}
                        fillWidth
                        horizontal="start"
                        delay={3.7}
                        > 
                          {institution.description}
                        </RevealFx>
                      </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="m"
              >                        
                <RevealFx
                translateY={5}
                fillWidth
                horizontal="start"
                delay={3.8}
                > 
                  {about.technical.title}
                </RevealFx>
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <RevealFx
                        translateY={5}
                        fillWidth
                        horizontal="start"
                        delay={3.9}
                        > 
                        <Text variant="heading-strong-l">{skill.title}</Text>
                      </RevealFx>
                      <RevealFx
                        translateY={5}
                        fillWidth
                        horizontal="start"
                        delay={4}
                        > 
                        <Text variant="body-default-m" onBackground="neutral-weak">
                          {skill.description}
                        </Text>
                      </RevealFx>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.projects.display && (
            <>
              <Heading
                as="h2"
                id={about.projects.title}
                variant="display-strong-s"
                marginBottom="20"
                marginTop="40"
              >
                <RevealFx
                  translateY={5}
                  fillWidth
                  horizontal="start"
                  delay={4}
                > 
                  {about.projects.title}
                </RevealFx>
              </Heading>
              <Column fillWidth gap="l">
                {about.projects.project.map((project, index) => (
                  <Column key={`${project}-${index}`} fillWidth gap="4">
                    {/* <Text variant="heading-strong-l">{project.title}</Text> */}
                      <RevealFx
                        translateY={5}
                        fillWidth
                        horizontal="center"
                        delay={4.1}
                      >
                    <Text variant="body-default-m" onBackground="neutral-weak">
                        {project.description}
                    </Text>
                      </RevealFx>
                    {project.images && project.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {project.images.map((image, index) => (
                        <RevealFx
                          translateY={5}
                          fillWidth
                          horizontal="start"
                          delay={4.2}
                        > 
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="l"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                            className={styles.projectspacing}
                          >
                              <img
                                //@ts-ignore
                                // sizes={image.width.toString()}
                                //@ts-ignore
                                alt={image.alt}
                                //@ts-ignore
                                src={image.src}
                                className={styles.projectsimg}
                              />
                          </Flex>
                        </RevealFx>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
