"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@/once-ui/components";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  hostedsite: string;
  stack: string;
  features: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
  hostedsite,
  stack,
  features,
}) => {
  return (
    <Column fillWidth gap="m" horizontal="center">
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        images={images.map((image) => ({
          src: image,
          alt: title,
        }))}
      />
      <Column
        fillWidth
        horizontal="center"
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="16"
      >
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-xl" align="center">
            {title}
          </Heading>
        )}

        {avatars?.length > 0 && (
          <AvatarGroup avatars={avatars} size="m" reverse />
        )}

        {description?.trim() && (
          <Text
            wrap="balance"
            variant="body-default-m"
            onBackground="neutral-weak"
            align="center"
          >
            {description}
          </Text>
        )}

        {features && features.length > 0 && (
          <Column gap="8" horizontal="center" fillWidth>
            <Text variant="label-strong-m" align="center">Key Features:</Text>
            <Column gap="4" horizontal="center" fillWidth>
              {features.map((feature, index) => (
                <Text
                  key={index}
                  variant="body-default-s"
                  onBackground="neutral-weak"
                  align="center"
                >
                  {feature}
                </Text>
              ))}
            </Column>
          </Column>
        )}

        {stack && (
          <Flex gap="8" wrap vertical="center" horizontal="center">
            <Text variant="label-strong-m" align="center">Tech Stack:</Text>
            <Text variant="body-default-s" onBackground="neutral-weak" align="center">
              {stack}
            </Text>
          </Flex>
        )}

        {(link || hostedsite) && (
          <Flex gap="16" wrap paddingTop="4" horizontal="center">
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">View project</Text>
              </SmartLink>
            )}
            {hostedsite && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={hostedsite}
              >
                <Text variant="body-default-s">View site</Text>
              </SmartLink>
            )}
          </Flex>
        )}
      </Column>
    </Column>
  );
};
