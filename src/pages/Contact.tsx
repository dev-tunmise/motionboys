import { MessageCircle, Send } from "lucide-react";

export default function Contact() {
  return (
    <main className="pt-16">
      <div className="container py-16 max-w-2xl">
        <div className="mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Contact.</h1>
        </div>

        <div className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Got a question about an order? Want to know if something is restocking? Just want to talk kicks? Reach out directly — we respond fast.
          </p>

          <div className="grid gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/234XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-card border border-border p-5 hover:border-foreground transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-wider uppercase">WhatsApp</p>
                <p className="text-xs text-muted-foreground mt-0.5">Fastest way to reach us. DM for orders, questions, anything.</p>
              </div>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/motionboys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-card border border-border p-5 hover:border-foreground transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-foreground transition-colors">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-sm font-semibold tracking-wider uppercase">Telegram Channel</p>
                <p className="text-xs text-muted-foreground mt-0.5">Join the community. See drops first, exclusive content, behind the scenes.</p>
              </div>
            </a>
          </div>

          <div className="border-t border-border pt-8 space-y-2">
            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-display">Response Time</p>
            <p className="text-sm text-muted-foreground">We typically reply within a few hours. For urgent order enquiries, WhatsApp is best.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
