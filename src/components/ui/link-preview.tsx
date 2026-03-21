"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { encode } from "qss";
import React from "react";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src: string;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};

// HoverPeek component with lens effect
function usePreviewSource(
  url: string,
  width: number,
  height: number,
  quality: number,
  isStatic: boolean,
  staticImageSrc?: string,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: encode is stable
  return React.useMemo(() => {
    if (isStatic) {
      return staticImageSrc || "";
    }
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 2.5,
      "viewport.height": height * 2.5,
    });
    return `https://api.microlink.io/?${params}`;
  }, [encode, isStatic, staticImageSrc, url, width, height, quality]);
}

function useHoverState(followMouse: boolean) {
  const [isPeeking, setPeeking] = React.useState(false);
  const mouseX = useMotionValue(0);
  const springConfig = { stiffness: 120, damping: 20 };
  const followX = useSpring(mouseX, springConfig);

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!followMouse) return;
      const target = event.currentTarget;
      const targetRect = target.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) * 0.3;
      mouseX.set(offsetFromCenter);
    },
    [mouseX, followMouse],
  );

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setPeeking(open);
      if (!open) {
        mouseX.set(0);
      }
    },
    [mouseX],
  );

  return { isPeeking, handleOpenChange, handlePointerMove, followX };
}

type HoverPeekProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  peekWidth?: number;
  peekHeight?: number;
  imageQuality?: number;
  enableMouseFollow?: boolean;
  enableLensEffect?: boolean;
  lensZoomFactor?: number;
  lensSize?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const HoverPeek = ({
  children,
  url,
  className,
  peekWidth = 320,
  peekHeight = 200,
  imageQuality = 50,
  isStatic = false,
  imageSrc = "",
  enableMouseFollow = true,
  enableLensEffect = true,
  lensZoomFactor = 1.75,
  lensSize = 100,
}: HoverPeekProps) => {
  const [imageLoadFailed, setImageLoadFailed] = React.useState(false);
  const finalImageSrc = usePreviewSource(
    url,
    peekWidth,
    peekHeight,
    imageQuality,
    isStatic,
    imageSrc,
  );
  const { isPeeking, handleOpenChange, handlePointerMove, followX } =
    useHoverState(enableMouseFollow);

  const [isHoveringLens, setIsHoveringLens] = React.useState(false);
  const [lensMousePosition, setLensMousePosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    setImageLoadFailed(false);
    // biome-ignore lint/correctness/useExhaustiveDependencies: setImageLoadFailed is stable
  }, [finalImageSrc]);
  React.useEffect(() => {
    if (!isPeeking) {
      setImageLoadFailed(false);
      setIsHoveringLens(false);
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: setters are stable
  }, [isPeeking]);

  const handleLensMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enableLensEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensMousePosition({ x, y });
  };
  const handleLensMouseEnter = () => {
    if (enableLensEffect) setIsHoveringLens(true);
  };
  const handleLensMouseLeave = () => {
    if (enableLensEffect) setIsHoveringLens(false);
  };

  const cardMotionVariants = {
    initial: { opacity: 0, rotateY: -90, transition: { duration: 0.15 } },
    animate: {
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring" as const, stiffness: 200, damping: 18 },
    },
    exit: { opacity: 0, rotateY: 90, transition: { duration: 0.15 } },
  };

  const lensMotionVariants = {
    initial: { opacity: 0, scale: 0.7 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  };

  const triggerChild = React.isValidElement(children)
    ? React.cloneElement(
        children as React.ReactElement<Record<string, unknown>>,
        {
          ...(children.props as Record<string, unknown>),
          className: cn(
            ((children.props as Record<string, unknown>).className as
              | string
              | undefined) || "",
            className,
          ),
          onPointerMove: handlePointerMove,
        },
      )
    : React.createElement(
        "span",
        { className, onPointerMove: handlePointerMove },
        children,
      );

  return (
    <HoverCardPrimitive.Root
      openDelay={75}
      closeDelay={150}
      onOpenChange={handleOpenChange}
    >
      <HoverCardPrimitive.Trigger asChild>
        {triggerChild}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className="[perspective:800px] [--radix-hover-card-content-transform-origin:center_center] z-50"
          side="top"
          align="center"
          sideOffset={12}
          style={{ pointerEvents: enableLensEffect ? "none" : "auto" }}
        >
          <AnimatePresence>
            {isPeeking && (
              <motion.div
                variants={cardMotionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                  x: enableMouseFollow ? followX : 0,
                  pointerEvents: "auto",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative block overflow-hidden rounded-lg bg-white dark:bg-neutral-900",
                    "border border-neutral-200 dark:border-neutral-700",
                    "shadow-lg hover:shadow-xl transition-shadow",
                    "p-0.5",
                  )}
                  onMouseEnter={handleLensMouseEnter}
                  onMouseLeave={handleLensMouseLeave}
                  onMouseMove={handleLensMouseMove}
                >
                  {imageLoadFailed ? (
                    <div
                      className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-xs font-sans"
                      style={{ width: peekWidth, height: peekHeight }}
                    >
                      Preview unavailable
                    </div>
                  ) : (
                    <img
                      src={finalImageSrc}
                      width={peekWidth}
                      height={peekHeight}
                      className="block rounded-[5px] pointer-events-none bg-neutral-50 dark:bg-neutral-800 align-top"
                      alt={`Link preview for ${url}`}
                      onError={() => setImageLoadFailed(true)}
                      loading="lazy"
                    />
                  )}

                  <AnimatePresence>
                    {enableLensEffect && isHoveringLens && !imageLoadFailed && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
                        variants={lensMotionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                          maskImage: `radial-gradient(circle ${lensSize / 2}px at ${lensMousePosition.x}px ${lensMousePosition.y}px, black ${lensSize / 2}px, transparent ${lensSize / 2}px)`,
                          WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${lensMousePosition.x}px ${lensMousePosition.y}px, black ${lensSize / 2}px, transparent ${lensSize / 2}px)`,
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            transform: `scale(${lensZoomFactor})`,
                            transformOrigin: `${lensMousePosition.x}px ${lensMousePosition.y}px`,
                          }}
                        >
                          <img
                            src={finalImageSrc}
                            width={peekWidth}
                            height={peekHeight}
                            className="block rounded-[5px] bg-neutral-50 dark:bg-neutral-800 align-top"
                            alt=""
                            aria-hidden="true"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};
