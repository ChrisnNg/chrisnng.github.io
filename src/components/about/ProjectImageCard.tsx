"use client";

import React, { useState } from "react";
import { Flex, RevealFx } from "@/once-ui/components";
import styles from "./about.module.scss";

interface ProjectImageProps {
  image: {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
  };
  delay?: number;
}

export const ProjectImageCard: React.FC<ProjectImageProps> = ({
  image,
  delay = 2.3,
}) => {
  const [isRetained, setIsRetained] = useState(false);

  return (
    <Flex
      radius="l"
      className={`${styles.darkoverlay} ${isRetained ? styles.retained : ""}`}
      onClick={() => setIsRetained((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-pressed={isRetained}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsRetained((prev) => !prev);
        }
      }}
    >
      <RevealFx translateY={5} fillWidth horizontal="start" delay={delay}>
        <Flex
          radius="l"
          //@ts-ignore
          minWidth={image.width}
          //@ts-ignore
          height={image.height}
          className={styles.projectspacing}
        >
          <img
            //@ts-ignore
            alt={image.alt}
            //@ts-ignore
            src={image.src}
            className={styles.projectsimg}
          />
          <Flex
            fillWidth
            position="absolute"
            height={18}
            horizontal="center"
            vertical="center"
            paddingBottom="32"
            textVariant="display-default-xs"
            className={styles.projectimgtext}
          >
            {image.alt}
          </Flex>
        </Flex>
      </RevealFx>
    </Flex>
  );
};
