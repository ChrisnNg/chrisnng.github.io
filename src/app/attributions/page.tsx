import {
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  RevealFx,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import styles from "@/components/about/about.module.scss";

export async function generateMetadata() {
  const title = "Attributions";
  const description = "Attributions and credits for this portfolio website";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/attributions`,
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

export default function Attributions() {
  return (
    <Column maxWidth="m">
      <Flex fillWidth mobileDirection="column" horizontal="center">
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id="attributions"
            fillWidth
            vertical="center"
            marginBottom="32"
            className={styles.introHeader}
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              Attributions
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              Credits and acknowledgments
            </Text>
          </Column>

          <Column textVariant="body-default-l" fillWidth gap="m">
            <RevealFx translateY={5} fillWidth horizontal="start">
              <Text variant="body-default-m" onBackground="neutral-weak">
                <SmartLink
                  href="https://once-ui.com/templates/magic-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Once UI
                </SmartLink>{" "}
                - A modular design system and component library for React and
                Next.js
              </Text>
            </RevealFx>
          </Column>

          <Heading
            as="h2"
            id="additional-credits"
            variant="display-strong-s"
            marginBottom="m"
            marginTop="40"
          ></Heading>
          <Column fillWidth gap="l">
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.4}>
                <Text variant="heading-strong-l">Framework & Runtime</Text>
              </RevealFx>
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.5}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  <SmartLink
                    href="https://nextjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Next.js 15
                  </SmartLink>{" "}
                  (App Router) with React 19 and Node.js v18.17+
                </Text>
              </RevealFx>
            </Column>
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.6}>
                <Text variant="heading-strong-l">Styling & Theming</Text>
              </RevealFx>
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.7}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  SCSS (Sass) with CSS Modules and Once UI design tokens (CSS
                  variables)
                </Text>
              </RevealFx>
            </Column>
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.8}>
                <Text variant="heading-strong-l">Icons</Text>
              </RevealFx>
              <RevealFx translateY={5} fillWidth horizontal="start" delay={0.9}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  <SmartLink
                    href="https://react-icons.github.io/react-icons"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    react-icons
                  </SmartLink>{" "}
                  (Heroicons, Phosphor Icons, FontAwesome 6)
                </Text>
              </RevealFx>
            </Column>
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={1.0}>
                <Text variant="heading-strong-l">Content Management</Text>
              </RevealFx>
              <RevealFx translateY={5} fillWidth horizontal="start" delay={1.1}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  MDX with{" "}
                  <SmartLink
                    href="https://github.com/hashicorp/next-mdx-remote"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    next-mdx-remote
                  </SmartLink>{" "}
                  and{" "}
                  <SmartLink
                    href="https://github.com/jonschlinkert/gray-matter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    gray-matter
                  </SmartLink>
                </Text>
              </RevealFx>
            </Column>
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={1.3}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  <SmartLink
                    href="https://prismjs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PrismJS
                  </SmartLink>{" "}
                  via Once UI's CodeBlock component
                </Text>
              </RevealFx>
            </Column>
            <Column fillWidth gap="4">
              <RevealFx translateY={5} fillWidth horizontal="start" delay={1.4}>
                <Text variant="heading-strong-l">Media & Layout Utilities</Text>
              </RevealFx>
              <RevealFx translateY={5} fillWidth horizontal="start" delay={1.5}>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  <SmartLink
                    href="https://floating-ui.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @floating-ui/react-dom
                  </SmartLink>{" "}
                  for popovers/tooltips, Next.js Image optimization with{" "}
                  <SmartLink
                    href="https://sharp.pixelplumbing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    sharp
                  </SmartLink>
                </Text>
              </RevealFx>
            </Column>
          </Column>
        </Column>
      </Flex>
    </Column>
  );
}
