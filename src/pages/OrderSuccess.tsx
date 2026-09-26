import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  return (
    <main className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-sm">
        <CheckCircle className="w-12 h-12 mx-auto text-accent" />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Order Confirmed!</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Payment received. We'll reach out on WhatsApp to confirm your delivery details.
          </p>
        </div>
        <div className="space-y-3">
          <a
            href="https://wa.me/234XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Chat Us on WhatsApp
          </a>
          <Link
            to="/shop"
            className="block w-full border border-border text-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
