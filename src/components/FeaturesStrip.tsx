import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield, Gem } from "lucide-react";

const features = [
  { icon: Truck, label: "Free Shipping", detail: "On orders over EGP 1,500", tooltip: "Delivered within 2-5 business days across Egypt" },
  { icon: RotateCcw, label: "14-Day Returns", detail: "Hassle-free exchanges", tooltip: "Full refund or exchange, no questions asked" },
  { icon: Shield, label: "Secure Payment", detail: "256-bit SSL encryption", tooltip: "We accept Visa, Mastercard, and cash on delivery" },
  { icon: Gem, label: "Premium Quality", detail: "Handcrafted materials", tooltip: "Ethically sourced fabrics and materials" },
];

export function FeaturesStrip() {
  return (
    <section className="py-14 md:py-20 border-b border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 25% 50%, hsl(var(--gold)), transparent 50%),
                          radial-gradient(circle at 75% 50%, hsl(var(--gold-light)), transparent 50%)`,
      }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              className="group relative flex flex-col items-center text-center gap-3 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-14 h-14 rounded-2xl bg-secondary/80 border border-border/30 flex items-center justify-center transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-gold/40 group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.2)]">
                <feature.icon
                  className="w-5 h-5 text-foreground/55 transition-colors duration-300 group-hover:text-gold-dark"
                  strokeWidth={1.5}
                />
              </div>

              <div>
                <p className="text-[11px] md:text-xs font-sans font-medium text-foreground tracking-wide">{feature.label}</p>
                <p className="text-[9px] md:text-[10px] font-sans text-muted-foreground mt-0.5 tracking-wide">{feature.detail}</p>
              </div>

              {/* Tooltip — pure CSS */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-[9px] font-sans whitespace-nowrap shadow-lg pointer-events-none z-30 opacity-0 -translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                {feature.tooltip}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
