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
  const [spineHeightPx, setSpineHeightPx] = useState<number>(0);
  const [spineTrackTop, setSpineTrackTop] = useState<number>(14);
  const [spineTrackHeight, setSpineTrackHeight] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
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

  const updateSpinePixels = useCallback((activeIdx: number, fraction: number) => {
    if (!containerRef.current) return;
    const dots = containerRef.current.querySelectorAll<HTMLElement>(`.${styles.tocDot}`);
    if (dots.length === 0) return;

    const firstDot = dots[0];
    const lastDot = dots[dots.length - 1];

    const firstCenter = firstDot.offsetTop + firstDot.offsetHeight / 2;
    const lastCenter = lastDot.offsetTop + lastDot.offsetHeight / 2;
    const totalTrack = Math.max(0, lastCenter - firstCenter);

    setSpineTrackTop(firstCenter);
    setSpineTrackHeight(totalTrack);

    if (activeIdx <= 0 && fraction <= 0) {
      setSpineHeightPx(0);
      return;
    }

    if (activeIdx >= dots.length - 1 || fraction >= 1) {
      setSpineHeightPx(totalTrack);
    } else {
      const currentDot = dots[activeIdx];
      const nextDot = dots[activeIdx + 1] || currentDot;

      const currCenter = currentDot.offsetTop + currentDot.offsetHeight / 2;
      const nextCenter = nextDot.offsetTop + nextDot.offsetHeight / 2;

      const fill = (currCenter - firstCenter) + fraction * (nextCenter - currCenter);
      setSpineHeightPx(Math.max(0, Math.min(totalTrack, fill)));
    }
  }, []);

  const updateSyncState = useCallback(() => {
    if (isClickScrollingRef.current) return;

    const sections = visibleSectionsRef.current;
    if (sections.length === 0) return;

    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // Check top of page - fully retract immediately when at top
    if (scrollY <= 10) {
      setActiveSection(sections[0].title);
      setScrollProgress(0);
      updateSpinePixels(0, 0);
      return;
    }

    // Check bottom of page
    if (scrollY + innerHeight >= scrollHeight - 40) {
      const last = sections[sections.length - 1];
      if (last) setActiveSection(last.title);
      setScrollProgress(100);
      updateSpinePixels(sections.length - 1, 1);
      return;
    }

    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 32 : Math.max(100, Math.min(220, innerHeight * 0.25));

    const positions: { title: string; docTop: number }[] = [];
    for (const sec of sections) {
      const el = document.getElementById(sec.title);
      if (el) {
        const r = el.getBoundingClientRect();
        positions.push({
          title: sec.title,
          docTop: r.top + scrollY,
        });
      }
    }

    if (positions.length === 0) return;

    // Trigger scroll position where each section activates
    // Section 0 starts at scrollY = 0 so progress retracts fully to 0 at the top
    const triggerScrolls = positions.map((p, idx) => {
      if (idx === 0) return 0;
      return Math.max(1, p.docTop - threshold);
    });

    if (scrollY <= triggerScrolls[0]) {
      setActiveSection(positions[0].title);
      setScrollProgress(0);
      updateSpinePixels(0, 0);
      return;
    }

    let activeIdx = 0;
    let fraction = 0;

    for (let i = 0; i < triggerScrolls.length - 1; i++) {
      const startScroll = triggerScrolls[i];
      const endScroll = triggerScrolls[i + 1];

      if (scrollY >= startScroll && scrollY < endScroll) {
        activeIdx = i;
        const diff = endScroll - startScroll;
        fraction = diff > 0 ? (scrollY - startScroll) / diff : 0;
        break;
      } else if (i === triggerScrolls.length - 2 && scrollY >= endScroll) {
        activeIdx = i + 1;
        fraction = 1;
      }
    }

    if (activeIdx >= triggerScrolls.length - 1) {
      activeIdx = triggerScrolls.length - 1;
      fraction = 1;
    }

    setActiveSection(positions[activeIdx].title);

    const totalIntervals = Math.max(1, positions.length - 1);
    const overallProgress = Math.min(
      100,
      Math.max(0, ((activeIdx + fraction) / totalIntervals) * 100)
    );
    setScrollProgress(overallProgress);
    updateSpinePixels(activeIdx, fraction);
  }, [updateSpinePixels]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateSyncState();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleUserInteraction = () => {
      cancelClickScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("scrollend", handleUserInteraction, { passive: true });
    window.addEventListener("resize", updateSyncState);

    // Initial check on mount
    setMounted(true);
    updateSyncState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      window.removeEventListener("scrollend", handleUserInteraction);
      window.removeEventListener("resize", updateSyncState);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateSyncState, cancelClickScroll]);

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

      // Immediately sync progress indicators to target section
      const sections = visibleSectionsRef.current;
      const targetIdx = sections.findIndex((s) => s.title === id);
      if (targetIdx !== -1) {
        if (targetIdx === 0) {
          setScrollProgress(0);
          updateSpinePixels(0, 0);
        } else {
          const totalIntervals = Math.max(1, sections.length - 1);
          const targetPercent = (targetIdx / totalIntervals) * 100;
          setScrollProgress(targetPercent);
          updateSpinePixels(targetIdx, 0);
        }
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
        updateSyncState();
      }, 650);
    }
  };

  if (!about.tableOfContent.display) return null;

  return (
    <>
      {/* Desktop sidebar navigation with synced progress spine & progress bar */}
      <div className={styles.tocNavDesktop}>
        <div className={styles.tocSpineContainer} ref={containerRef}>
          {/* Vertical progress spine connecting sections in exact pixel sync */}
          <div
            className={styles.tocSpineTrack}
            style={{
              top: `${spineTrackTop}px`,
              height: spineTrackHeight > 0 ? `${spineTrackHeight}px` : "calc(100% - 28px)",
            }}
            aria-hidden="true"
          >
            <div
              className={styles.tocSpineFill}
              style={{
                height: spineTrackHeight > 0 ? `${spineHeightPx}px` : `${scrollProgress}%`,
                opacity: spineHeightPx > 0 || scrollProgress > 0 ? 1 : 0,
                transition: "height 0.12s ease-out, opacity 0.15s ease-out",
              }}
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
                  style={{
                    width: `${scrollProgress}%`,
                    opacity: scrollProgress > 0 ? 1 : 0,
                    transition: "width 0.12s ease-out, opacity 0.15s ease-out",
                  }}
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
