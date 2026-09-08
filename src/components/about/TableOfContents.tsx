"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
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

const getCompactTitle = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("intro")) return "Intro";
  if (lower.includes("work")) return "Work";
  if (lower.includes("education")) return "Education";
  if (lower.includes("technical") || lower.includes("skill")) return "Skills";
  if (lower.includes("project")) return "Projects";
  return title;
};

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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeMobileItemRef = useRef<HTMLButtonElement | null>(null);

  const cancelClickScroll = useCallback(() => {
    isClickScrollingRef.current = false;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  }, []);

  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const maxScroll = scrollHeight - innerHeight;
    if (maxScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
      setScrollProgress(progress);
    } else {
      setScrollProgress(0);
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
          updateScrollProgress();
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
    window.addEventListener("resize", updateScrollProgress);

    // Initial check on mount
    setMounted(true);
    updateActiveSection();
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("scrollend", handleUserInteraction);
      window.removeEventListener("resize", updateScrollProgress);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateActiveSection, updateScrollProgress, cancelClickScroll]);

  // Gently scroll active mobile pill into view if compact bar is scrollable
  useEffect(() => {
    if (activeMobileItemRef.current) {
      activeMobileItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  const scrollTo = (id: string, defaultOffset: number = 80) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      isClickScrollingRef.current = true;

      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 24 : defaultOffset;

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
        updateScrollProgress();
      }, 600);
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <>
      {/* Desktop sidebar navigation */}
      <div className={styles.tocNavDesktop}>
        <div className={styles.tocSpineContainer}>
          {/* Vertical progress spine connecting sections */}
          <div className={styles.tocSpineTrack} aria-hidden="true">
            <div
              className={styles.tocSpineFill}
              style={{ height: `${scrollProgress}%` }}
            />
          </div>

          <Column
            as="nav"
            aria-label="Table of contents"
            fitWidth
            gap="16"
            style={{
              whiteSpace: "nowrap",
            }}
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
                    <span className={styles.tocDot} />
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
                            <span className={styles.tocSubDot} />
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
        </div>

        {/* Scroll progress bar beneath the sidebar navigation */}
        <div
          className={styles.tocProgressFooter}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Sidebar scroll progress"
        >
          <div className={styles.tocProgressLineTrack}>
            <div
              className={styles.tocProgressLineFill}
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <span className={styles.tocProgressText}>
            {Math.round(scrollProgress)}%
          </span>
        </div>
      </div>

      {/* Mobile compact floating navigation bar above main header */}
      {(() => {
        const mobileNav = (
          <nav
            aria-label="Compact page sections navigation"
            className={styles.tocNavMobile}
          >
            <div className={styles.tocMobilePill}>
              <div className={styles.tocMobileItems}>
                {visibleSections.map((section) => {
                  const isActive = activeSection === section.title;
                  return (
                    <button
                      type="button"
                      key={section.title}
                      ref={isActive ? activeMobileItemRef : null}
                      aria-current={isActive ? "true" : undefined}
                      className={`${styles.tocMobileItem} ${isActive ? styles.tocMobileItemActive : ""}`}
                      onClick={() => scrollTo(section.title, 24)}
                    >
                      {isActive && <span className={styles.tocMobileDot} />}
                      <span>{getCompactTitle(section.title)}</span>
                    </button>
                  );
                })}
              </div>
              <div
                className={styles.tocMobileProgressTrack}
                role="progressbar"
                aria-valuenow={Math.round(scrollProgress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Reading progress"
              >
                <div
                  className={styles.tocMobileProgressBar}
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
          </nav>
        );

        if (mounted && typeof document !== "undefined") {
          return createPortal(mobileNav, document.body);
        }
        return mobileNav;
      })()}
    </>
  );
};

export default TableOfContents;
