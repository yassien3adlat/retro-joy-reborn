import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import tshirtBlack from "@/assets/products/tshirt-black.png";
import tshirtWhite from "@/assets/products/tshirt-white.png";

interface Product3DCardProps {
  frontImage: string;
  title: string;
  price: string;
}

function Product3DCard({ frontImage, title, price }: Product3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateY = useMotionValue(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Lighting/shadow based on rotation
  const shadowX = useTransform(rotateY, [-180, 0, 180], [20, 0, -20]);
  const brightness = useTransform(rotateY, [-180, -90, 0, 90, 180], [0.6, 0.75, 1, 0.75, 0.6]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotateY.set(rotateY.get() + delta * 0.8);
  }, [rotateY]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    // Snap back to nearest front face (0 or 360)
    const current = rotateY.get() % 360;
    const nearest = Math.round(current / 360) * 360;
    animate(rotateY, nearest, { type: "spring", stiffness: 80, damping: 20 });
  }, [rotateY]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={cardRef}
        className="relative w-[280px] h-[320px] md:w-[340px] md:h-[400px] cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1000px" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Front face */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              filter: useTransform(brightness, (b) => `brightness(${b})`),
            }}
          >
            <img
              src={frontImage}
              alt={title}
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
              draggable={false}
            />
          </motion.div>

          {/* Back face */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              rotateY: 180,
              filter: useTransform(brightness, (b) => `brightness(${b})`),
            }}
          >
            <img
              src={frontImage}
              alt={`${title} back`}
              className="max-h-full max-w-full object-contain drop-shadow-2xl scale-x-[-1]"
              draggable={false}
            />
          </motion.div>
        </motion.div>

        {/* Dynamic shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 w-[60%] h-6 rounded-full opacity-20 blur-xl"
          style={{
            x: shadowX,
            translateX: "-50%",
            background: "hsl(var(--foreground))",
          }}
        />
      </div>

      {/* Product info */}
      <div className="text-center">
        <h3 className="font-serif text-lg md:text-xl tracking-tight">{title}</h3>
        <p className="mt-1 font-sans text-sm text-muted-foreground">{price}</p>
      </div>

      {/* Drag hint */}
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 flex items-center gap-2">
        <span className="inline-block w-4 h-[1px] bg-muted-foreground/30" />
        Drag to rotate
        <span className="inline-block w-4 h-[1px] bg-muted-foreground/30" />
      </p>
    </div>
  );
}

export function ProductShowcase3D() {
  const products = [
    { frontImage: tshirtBlack, title: "LOSTAR Eclipse Tee", price: "EGP 850" },
    { frontImage: tshirtWhite, title: "LOSTAR Legacy Tee", price: "EGP 850" },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 max-w-4xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Product3DCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
