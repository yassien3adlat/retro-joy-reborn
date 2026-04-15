import { useCallback, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import { staticProducts, type StaticProduct } from "@/data/staticProducts";

interface Product3DCardProps {
  product: StaticProduct;
  index: number;
}

export function Product3DCard({ product, index }: Product3DCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const releaseVelocity = useRef(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const rawRotateY = useMotionValue(index % 2 === 0 ? -8 : 8);
  const rotateY = useSpring(rawRotateY, {
    stiffness: 90,
    damping: 20,
    mass: 0.8,
  });

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    rawRotateY.stop();
    isDragging.current = true;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    releaseVelocity.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [rawRotateY]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const now = performance.now();
    const deltaX = e.clientX - lastX.current;
    const elapsed = Math.max(now - lastTime.current, 16);

    lastX.current = e.clientX;
    lastTime.current = now;

    const rotationDelta = deltaX * 2.1;
    releaseVelocity.current = rotationDelta / elapsed;
    rawRotateY.set(rawRotateY.get() + rotationDelta);
  }, [rawRotateY]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;
    const current = rawRotateY.get();
    const momentumTarget = current + releaseVelocity.current * 260;

    animate(rawRotateY, momentumTarget, {
      type: "spring",
      stiffness: 34,
      damping: 14,
      mass: 1,
      velocity: releaseVelocity.current,
    });
  }, [rawRotateY]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-w-0"
    >
      <div
        className="relative w-full cursor-grab select-none active:cursor-grabbing"
        style={{ perspective: "1400px", touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <motion.div
          className="relative aspect-[4/5] w-full"
          style={{
            rotateY,
            rotateX: -2,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[84%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--gold-light) / 0.42) 0%, hsl(var(--gold) / 0.18) 34%, transparent 72%)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: [0.98, 1.03, 0.98],
                      opacity: [0.5, 0.78, 0.5],
                    }
              }
              transition={{
                duration: 4.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.35,
              }}
            />
            <motion.div
              className="absolute left-1/2 top-[48%] h-[12%] w-[112%] -translate-x-1/2 -translate-y-1/2 opacity-55"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, hsl(var(--gold-light) / 0.44) 18%, hsl(var(--background) / 0.94) 50%, hsl(var(--gold-light) / 0.44) 82%, transparent 100%)",
                filter: "blur(11px)",
              }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      x: [-8, 8, -8],
                      opacity: [0.34, 0.58, 0.34],
                    }
              }
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2 + index * 0.4,
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, transparent 36%, hsl(var(--gold) / 0.16) 58%, transparent 74%)",
              }}
            />
            <div
              className="absolute bottom-[9%] left-1/2 h-[9%] w-[60%] -translate-x-1/2 opacity-35"
              style={{
                background: "radial-gradient(ellipse, hsl(var(--gold-light) / 0.3), transparent 68%)",
                filter: "blur(14px)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center p-1"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            {!imageLoaded && <div className="absolute inset-[12%] rounded-full bg-muted/20 animate-pulse" />}
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              draggable={false}
              onLoad={() => setImageLoaded(true)}
              className={`relative z-10 h-[98%] w-[98%] object-contain transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ filter: "drop-shadow(0 18px 28px rgba(15, 23, 42, 0.16))" }}
            />
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center p-1"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <img
              src={product.image}
              alt={`${product.title} back`}
              draggable={false}
              className="relative z-10 h-[98%] w-[98%] object-contain scale-x-[-1]"
              style={{ filter: "drop-shadow(0 18px 28px rgba(15, 23, 42, 0.16))" }}
            />
          </div>
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-[9%] w-[68%] -translate-x-1/2 rounded-[999px] opacity-45"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--foreground) / 0.12), transparent 72%)",
            filter: "blur(16px)",
          }}
        />
      </div>

      <Link to={`/product/static/${product.handle}`} className="mt-3 block text-center group">
        <h3 className="font-serif text-[15px] leading-snug tracking-tight transition-colors duration-300 group-hover:text-gold-dark md:text-xl">
          {product.title}
        </h3>
        <p className="mt-1 font-sans text-[10px] font-medium tracking-[0.22em] text-muted-foreground md:text-xs">
          {product.currency} {product.price.toLocaleString()}
        </p>
      </Link>
    </motion.article>
  );
}

export function ProductShowcase3D() {
  return (
    <section className="border-t border-border/20 py-16 md:py-28">
      <div className="container">
        <motion.div
          className="mb-10 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            New Arrivals
          </p>
          <h2 className="font-serif text-3xl tracking-tight md:text-4xl lg:text-5xl">
            The Collection
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-3 md:gap-8">
          {staticProducts.map((product, index) => (
            <Product3DCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
