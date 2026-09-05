"use client";

import { Flex, RevealFx, Scroller, SmartImage } from "@/once-ui/components";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Carousel.module.scss";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps extends React.ComponentProps<typeof Flex> {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string;
  sizes?: string;
  revealedByDefault?: boolean;
  interval?: number;
  autoRotate?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 9",
  sizes,
  revealedByDefault = true,
  interval = 5000,
  autoRotate = true,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [initialTransition, setInitialTransition] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);

  const nextImageRef = useRef<HTMLImageElement | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const revealTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const isPaused =
    isHovered || isDocumentHidden || !autoRotate || images.length <= 1;

  const preloadNextImage = useCallback(
    (nextIndex: number) => {
      if (nextIndex >= 0 && nextIndex < images.length) {
        if (typeof window !== "undefined") {
          nextImageRef.current = new window.Image();
          nextImageRef.current.src = images[nextIndex].src;
        }
      }
    },
    [images]
  );

  const handleControlClick = useCallback(
    (nextIndex: number) => {
      if (nextIndex !== activeIndex) {
        preloadNextImage(nextIndex);

        setIsTransitioning(false);

        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        if (revealTimeoutRef.current) {
          clearTimeout(revealTimeoutRef.current);
        }

        transitionTimeoutRef.current = setTimeout(() => {
          setActiveIndex(nextIndex);

          revealTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(true);
            transitionTimeoutRef.current = undefined;
            revealTimeoutRef.current = undefined;
          }, 100);
        }, 150);
      }
    },
    [activeIndex, preloadNextImage]
  );

  const handleImageClick = () => {
    if (images.length > 1) {
      const nextIndex = (activeIndex + 1) % images.length;
      handleControlClick(nextIndex);
    }
  };

  const handleProgressComplete = (index: number) => {
    if (index === activeIndex && images.length > 1 && !isPaused) {
      const nextIndex = (activeIndex + 1) % images.length;
      handleControlClick(nextIndex);
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentHidden(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!revealedByDefault && !initialTransition) {
      setIsTransitioning(true);
      setInitialTransition(true);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current);
      }
    };
  }, [revealedByDefault, initialTransition]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Flex
      fillWidth
      gap="12"
      direction="column"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      <RevealFx
        onClick={handleImageClick}
        fillWidth
        trigger={isTransitioning}
        translateY="16"
        aspectRatio={aspectRatio}
        speed="fast"
      >
        <SmartImage
          sizes={sizes}
          priority
          radius="l"
          border="neutral-alpha-weak"
          alt={images[activeIndex]?.alt}
          aspectRatio={aspectRatio}
          src={images[activeIndex]?.src}
          style={{
            ...(images.length > 1 && {
              cursor: "pointer",
            }),
          }}
        />
      </RevealFx>
      {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <div
              className={styles.indicatorWrapper}
              role="tablist"
              aria-label="Carousel slides"
            >
              {images.map((_, index) => {
                const isCurrent = activeIndex === index;
                const isPast = index < activeIndex;

                let fillClass = styles.fill;
                if (isPast) {
                  fillClass += ` ${styles.filled}`;
                } else if (isCurrent) {
                  fillClass += ` ${styles.animating}`;
                  if (isPaused) {
                    fillClass += ` ${styles.paused}`;
                  }
                }

                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Slide ${index + 1} of ${images.length}`}
                    className={styles.track}
                    onClick={() => handleControlClick(index)}
                  >
                    <span
                      key={
                        isCurrent
                          ? `active-${index}-${activeIndex}`
                          : `static-${index}`
                      }
                      className={fillClass}
                      style={
                        isCurrent
                          ? { animationDuration: `${interval}ms` }
                          : undefined
                      }
                      onAnimationEnd={() => handleProgressComplete(index)}
                    />
                  </button>
                );
              })}
            </div>
          ) : (
            <Scroller fillWidth gap="4" onItemClick={handleControlClick}>
              {images.map((image, index) => (
                <Flex
                  key={index}
                  style={{
                    border:
                      activeIndex === index
                        ? "2px solid var(--brand-solid-strong)"
                        : "none",
                    borderRadius: "var(--radius-m-nest-4)",
                    transition: "border 0.3s ease",
                  }}
                  cursor="interactive"
                  padding="4"
                  width="80"
                  height="80"
                >
                  <SmartImage
                    alt={image.alt}
                    aspectRatio="1 / 1"
                    sizes="120px"
                    src={image.src}
                    cursor="interactive"
                    radius="m"
                    transition="macro-medium"
                  />
                </Flex>
              ))}
            </Scroller>
          )}
        </>
      )}
    </Flex>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
