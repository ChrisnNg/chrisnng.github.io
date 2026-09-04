"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { Column } from "@/once-ui/components";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  structure,
  about,
}) => {
  const visibleSections = useMemo(
    () => structure.filter((section) => section.display),
    [structure]
  );
  const visibleSectionsRef = useRef(visibleSections);
  visibleSectionsRef.current = visibleSections;

  const [activeSection, setActiveSection] = useState<string>(
    visibleSections[0]?.title || ""
  );
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelClickScroll = useCallback(() => {
    isClickScrollingRef.current = false;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  const updateActiveSection = useCallback(() => {
    if (isClickScrollingRef.current) return;

    const sections = visibleSectionsRef.current;
    if (sections.length === 0) return;

    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // Check if reached bottom of page
    if (scrollY + innerHeight >= scrollHeight - 60) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) {
        setActiveSection(lastSection.title);
      }
      return;
    }

    // Check if near the top
    if (scrollY < 100) {
      setActiveSection(sections[0].title);
      return;
    }

    // Dynamic threshold based on viewport height (comfortably in upper third of screen)
    const threshold = Math.max(140, Math.min(260, innerHeight * 0.3));
    let current = sections[0].title;

    for (const section of sections) {
      const element = document.getElementById(section.title);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = section.title;
        } else {
          break;
        }
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // If user initiates manual scroll or touch, immediately resume scroll tracking
    const handleUserInteraction = () => {
      cancelClickScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("scrollend", handleUserInteraction, { passive: true });

    // Initial check on mount
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("scrollend", handleUserInteraction);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateActiveSection, cancelClickScroll]);

  const scrollTo = (id: string, offset: number = 80) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      isClickScrollingRef.current = true;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      // Re-enable scroll spy tracking after smooth scroll finishes
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
        updateActiveSection();
      }, 600);
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      as="nav"
      aria-label="Table of contents"
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
      position="fixed"
      paddingLeft="24"
      gap="24"
      hide="s"
      className={styles.tocNav}
    >
      {visibleSections.map((section, sectionIndex) => {
        const isActive = activeSection === section.title;

        return (
          <Column key={sectionIndex} className={styles.tocSection}>
            <div
              role="button"
              tabIndex={0}
              aria-current={isActive ? "true" : undefined}
              className={`${styles.tocItem} ${isActive ? styles.tocItemActive : ""}`}
              onClick={() => scrollTo(section.title, 80)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  scrollTo(section.title, 80);
                }
              }}
            >
              <span className={styles.tocDash} />
              <span className={styles.tocLabelWrapper}>
                <span className={styles.tocText}>{section.title}</span>
                <span className={styles.tocUnderline} />
              </span>
            </div>

            {about.tableOfContent.subItems && section.items.length > 0 && (
              <Column gap="8">
                {section.items.map((item, itemIndex) => {
                  const isSubActive = activeSection === item;

                  return (
                    <div
                      role="button"
                      tabIndex={0}
                      key={itemIndex}
                      aria-current={isSubActive ? "true" : undefined}
                      className={`${styles.tocSubItem} ${isSubActive ? styles.tocSubItemActive : ""}`}
                      onClick={() => scrollTo(item, 80)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          scrollTo(item, 80);
                        }
                      }}
                    >
                      <span className={styles.tocSubDash} />
                      <span className={styles.tocLabelWrapper}>
                        <span className={styles.tocSubText}>{item}</span>
                        <span className={styles.tocSubUnderline} />
                      </span>
                    </div>
                  );
                })}
              </Column>
            )}
          </Column>
        );
      })}
    </Column>
  );
};

export default TableOfContents;
