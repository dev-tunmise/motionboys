import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CountdownTimer from "@/components/CountdownTimer";
import heroImage from "@/assets/hero-model.jpg";

export default function Index() {
  const products = useProducts();
  const limitedDrops = products.filter((p) => p.isLimitedDrop && !p.isSoldOut);
  const featured = products.filter((p) => !p.isSoldOut).slice(0, 6);

  return (
    <main>
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt=""
            className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] w-auto object-contain opacity-25 translate-x-[10%]"
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40" />
        </div>

        <div className="relative container space-y-6">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display animate-fade-in-up">
              Lagos — 2026
            </p>
            <h1
              className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.95] animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Move
              <br />
              Different.
            </h1>
            <p
              className="text-muted-foreground text-sm md:text-base max-w-sm animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Sneakers, canvas, slides. Curated for the boys who know what they want on their feet.
            </p>
          </div>
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/shop?category=limited"
              className="border border-foreground text-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Explore the Motion
            </Link>
          </div>
        </div>
      </section>

      {limitedDrops.length > 0 && (
        <section className="border-b border-border">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-limited-drop animate-pulse-dot" />
              <span className="font-display text-xs font-bold tracking-[0.3em] uppercase">
                Active Drops
              </span>
            </div>
            {limitedDrops[0].dropEndsAt && (
              <CountdownTimer endsAt={limitedDrops[0].dropEndsAt} />
            )}
          </div>
        </section>
      )}

      <section className="container py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">
              Fresh Picks
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Featured
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-display tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container py-16 md:py-20">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-3">
              The Community
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
              Join the boys.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              See drops before anyone else. Ask questions. Link with the community. Everything happens on Telegram first.
            </p>
            <a
              href="https://t.me/motionboys"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Join Telegram <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Shop</h3>
            <div className="space-y-2">
              <Link to="/shop?category=sneakers" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Sneakers</Link>
              <Link to="/shop?category=canvas" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Canvas</Link>
              <Link to="/shop?category=slides" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Slides</Link>
              <Link to="/shop?category=limited" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Drops</Link>
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Info</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              <a href="https://wa.me/234XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">WhatsApp</a>
            </div>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Community</h3>
            <div className="space-y-2">
              <a href="https://t.me/motionboys" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Telegram</a>
            </div>
          </div>
          <div className="md:text-right">
            <h3 className="font-display text-sm font-semibold tracking-wider uppercase mb-4">Motion Boys</h3>
            <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
            <a href="mailto:motionboys@gmail.com" className="block text-sm text-muted-foreground hover:text-foreground transition-colors mt-1">motionboys@gmail.com</a>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="container py-6 flex items-center justify-between">
            <span className="font-display text-xs tracking-[0.2em] uppercase text-muted-foreground">
              © {new Date().getFullYear()} Motion Boys
            </span>
            <span className="text-xs text-muted-foreground">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
