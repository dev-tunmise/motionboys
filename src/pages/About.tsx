import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-model.jpg";

export default function About() {
  return (
    <main className="pt-16">
      <div className="container py-16 max-w-4xl">

        <div className="mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Who We Are</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Our Story.</h1>
        </div>

        <div className="mb-16 max-w-xl space-y-4">
          <h2 className="font-display text-xl font-bold tracking-tight">The Brand</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Motion Boys is a Lagos-based sneaker store built for guys who care about what is on their feet. No filler, no hype. Just good kicks — thrift finds, clean canvas, and proper slides — picked by hand and sold straight.
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            When it drops here, it passed the check. That is the standard.
          </p>
          <a
            href="https://t.me/motionboys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity mt-2"
          >
            Join the Community <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start mb-20">
          <div className="bg-card aspect-[3/4] overflow-hidden">
            <img src={heroImage} alt="Tunmise" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center space-y-5 md:pt-4">
            <h2 className="font-display text-xl font-bold tracking-tight">Tunmise</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              I started this because there was no store that felt like it was built for us. So I built it. Every item you see here, I have touched personally.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Everything here is curated with intent. If it is not good enough, it does not make it to the store.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Shop the Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
