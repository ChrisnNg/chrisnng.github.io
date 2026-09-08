"use client";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Flex, Icon, IconButton } from "@/once-ui/components";
import styles from "./about.module.scss";

interface StickyScheduleCallProps {
  link: string;
  targetId?: string;
}

export function StickyScheduleCall({
  link,
  targetId = "top-schedule-call",
}: StickyScheduleCallProps) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      // Becomes visible when the user scrolls below the top schedule a call button
      setIsScrolledPast(rect.bottom <= 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [targetId]);

  return (
    <div
      className={classNames(styles.stickyCallWrapper, {
        [styles.stickyCallWrapperVisible]: isScrolledPast,
      })}
      aria-hidden={!isScrolledPast}
    >
      <Flex
        fitWidth
        border="brand-alpha-medium"
        style={{
          backdropFilter: "blur(var(--static-space-1))",
          cursor: isScrolledPast ? "pointer" : "default",
        }}
        background="brand-alpha-weak"
        radius="full"
        padding="4"
        gap="8"
        vertical="center"
        onClick={() => {
          if (isScrolledPast && link) {
            window.open(link, "_blank", "noopener,noreferrer");
          }
        }}
      >
        <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
        <Flex paddingX="8" textVariant="body-default-s">
          Schedule a call
        </Flex>
        <IconButton
          href={link}
          data-border="rounded"
          variant="secondary"
          icon="chevronRight"
          tabIndex={isScrolledPast ? 0 : -1}
        />
      </Flex>
    </div>
  );
}
