import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { Link } from "react-router-dom";
import type { StaticProduct } from "@/data/staticProducts";

interface Product3DCardProps {
  product: StaticProduct;
  index: number;
}

function Product3DCard({ product, index }: Product3DCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const rawRotateY = useMotionValue(0);
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 25, mass: 0.8 });

  // Subtle tilt on vertical axis for depth
  const shadowOffsetX = useTransform(rotateY, [-180, 0, 180], [30, 0, -30]);
  const shadowBlur = useTransform(rotateY, [-180, -90, 0, 90, 180], [40, 25, 50, 25, 40]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rawRotateY.set(rawRotateY.get() + delta * 0.6);
  }, [rawRotateY]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    // Snap to nearest 0° or ±360° face
    const current = rawRotateY.get();
    const nearest = Math.round(current / 360) * 360;
    animate(rawRotateY, nearest, { type: "spring", stiffness: 60, damping: 18 });
  }, [rawRotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      {/* 3D rotation area */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[340px] md:max-w-[420px] cursor-grab active:cursor-grabbing select-none touch-none"
        style={{ perspective: "1200px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="relative w-full aspect-[3/4] flex items-center justify-center"
          style={{
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            {!imageLoaded && (
              <div className="absolute inset-[10%] rounded-2xl bg-muted/20 animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              draggable={false}
              className={`relative z-10 w-[92%] h-[92%] object-contain transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              }}
            />
          </div>

          {/* Back face (mirrored) */}
          <div
            className="absolute inset-0 flex items-center justify-center p-4"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <img
              src={product.image}
              alt={`${product.title} back`}
              draggable={false}
              className="w-[92%] h-[92%] object-contain scale-x-[-1]"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
              }}
            />
          </div>
        </motion.div>

        {/* Floor shadow */}
        <motion.div
          className="absolute -bottom-3 left-1/2 w-[55%] h-8 rounded-[50%] pointer-events-none"
          style={{
            x: shadowOffsetX,
            translateX: "-50%",
            filter: useTransform(shadowBlur, (b) => `blur(${b}px)`),
            background: "radial-gradient(ellipse, hsl(var(--foreground) / 0.12), transparent 70%)",
          }}
        />
      </div>

      {/* Drag hint */}
      <motion.p
        className="mt-4 font-sans text-[9px] uppercase tracking-[0.25em] text-muted-foreground/40 flex items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 + index * 0.2 }}
      >
        <span className="inline-block w-5 h-[0.5px] bg-muted-foreground/20" />
        Drag to rotate
        <span className="inline-block w-5 h-[0.5px] bg-muted-foreground/20" />
      </motion.p>

      {/* Product info */}
      <Link
        to={`/product/static/${product.handle}`}
        className="mt-6 text-center group"
      >
        <h3 className="font-serif text-lg md:text-xl tracking-tight transition-colors duration-300 group-hover:text-gold-dark">
          {product.title}
        </h3>
        <p className="mt-1.5 font-sans text-xs md:text-sm font-medium tracking-widest text-muted-foreground">
          {product.currency} {product.price.toLocaleString()}
        </p>
        <span className="mt-3 inline-block font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-muted-foreground/20 pb-0.5 transition-all duration-300 group-hover:text-foreground group-hover:border-foreground/40">
          View Details
        </span>
      </Link>
    </motion.div>
  );
}

export function ProductShowcase3D() {
  return (
    <section className="py-20 md:py-32 border-t border-border/20">
      <div className="container">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
            New Arrivals
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight">
            The Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-5xl mx-auto">
          {/* Products are imported inline to avoid circular deps */}
        </div>
      </div>
    </section>
  );
}

// Export card for external use
export { Product3DCard };
