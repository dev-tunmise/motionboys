import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["all", "sneakers", "canvas", "slides", "limited"] as const;
const PER_PAGE = 10;

export default function Shop() {
  const products = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = products.filter((p) => {
    const matchesCategory = categoryParam === "all" || p.category === categoryParam;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const setCategory = (cat: string) => {
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
    setPage(1);
  };

  return (
    <main className="pt-16">
      <div className="container py-12">
        <div className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Browse</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Shop</h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-display font-medium tracking-wider uppercase border transition-colors ${
                  (cat === "all" && categoryParam === "all") || cat === categoryParam
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                }`}
              >
                {cat === "limited" ? "Drops" : cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-secondary text-foreground px-4 py-2.5 text-sm border border-border focus:outline-none focus:border-foreground transition-colors w-full md:w-56"
          />
        </div>

        {paginated.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`text-xs font-display tracking-widest transition-colors ${
                  p === page
                    ? "text-foreground"
                    : "text-muted-foreground/40 hover:text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="border-t border-border mt-20 pt-12 flex justify-center">
          <a
            href="https://t.me/motionboys"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground px-6 py-3 font-display text-xs tracking-wider uppercase hover:text-foreground hover:border-foreground transition-colors"
          >
            Join Our Community <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
