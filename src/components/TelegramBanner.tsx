import { useState } from "react";
import { X, Send } from "lucide-react";

export default function TelegramBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-card border border-border backdrop-blur-md px-5 py-4 flex items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center border border-border shrink-0">
            <Send className="w-4 h-4" />
          </div>
          <div>
            <p className="font-display text-xs font-bold tracking-wider uppercase">Join the Community</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">See drops first on our Telegram channel.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://t.me/motionboys"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-4 py-2 font-display text-[11px] font-bold tracking-wider uppercase hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Join Now
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
