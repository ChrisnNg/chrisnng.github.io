import { Column, Flex, Heading, SmartLink, Text, RevealFx } from "@/once-ui/components";
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
                      <Heading className={styles.textAlign} variant="display-strong-s">
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
          
                    <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
                                          <RevealFx translateY={5} fillWidth horizontal="start">
                                            <Text variant="body-default-m" onBackground="neutral-weak">
                                              <SmartLink
                                                href="https://once-ui.com/templates/magic-portfolio"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                Once UI
                                              </SmartLink>{" "}
                                              - A modular design system and component library for React and Next.js
                                            </Text>
                                          </RevealFx>
                                        </Column>
        </Column>
      </Flex>
    </Column>
  );
}