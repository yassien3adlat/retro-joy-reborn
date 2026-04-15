import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Snowflake } from "lucide-react";
import { getProductsBySeason } from "@/data/staticProducts";
import { StaticProductCard } from "@/components/StaticProductCard";
import type { Season } from "@/data/staticProducts";

const tabs: { season: Season; label: string; icon: typeof Sun; tagline: string }[] = [
  { season: "summer", label: "Summer", icon: Sun, tagline: "Sun-Kissed Essentials" },
  { season: "winter", label: "Winter", icon: Snowflake, tagline: "Cold-Weather Elegance" },
];

export function SeasonalCollections() {
  const [active, setActive] = useState<Season>("summer");
  const current = tabs.find((t) => t.season === active)!;
  const products = getProductsBySeason(active);

  return (
    <section className="py-16 md:py-24 border-t border-border/20">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] md:text-[11px] font-sans font-medium uppercase tracking-[0.4em] text-muted-foreground mb-4">
            Curated For Every Season
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-tight text-foreground">
            Seasonal Collections
          </h2>
          <motion.div
            className="mt-5 mx-auto w-14 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-1 mb-10 md:mb-14">
          <div className="relative flex items-center rounded-full border border-border/40 bg-secondary/50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.season}
                onClick={() => setActive(tab.season)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 py-2.5 md:px-7 md:py-3 font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === tab.season
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {tab.label}
                {active === tab.season && (
                  <motion.div
                    layoutId="season-tab-bg"
                    className="absolute inset-0 rounded-full bg-foreground"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.tagline}
            className="text-center text-xs md:text-sm font-sans text-muted-foreground tracking-wide mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {current.tagline}
          </motion.p>
        </AnimatePresence>

        {/* Products grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {products.map((product, i) => (
              <StaticProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
