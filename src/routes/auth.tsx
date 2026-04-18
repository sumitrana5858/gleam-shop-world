import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { cls } from "@/lib/format";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — LUXE" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-[calc(100vh-200px)] grid lg:grid-cols-2">
      {/* Image side */}
      <div className="hidden lg:block relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 text-background">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">LUXE Members</div>
          <div className="font-display text-4xl leading-tight">Quiet drops.<br/>Considered editorials.</div>
        </div>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="font-display text-3xl">{mode === "signin" ? "Welcome back" : "Create account"}</div>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === "signin" ? "Sign in to access your bag, orders and wishlist." : "Join to access drops and member-only editorials."}
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Input label="Name" type="text" />
            )}
            <Input label="Email" type="email" />
            <Input label="Password" type="password" />
            {mode === "signin" && (
              <div className="text-right">
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</button>
              </div>
            )}
            <button className="w-full bg-foreground text-background rounded-full py-3 text-sm uppercase tracking-[0.2em]">
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-2">
            <button className="w-full border border-border rounded-full py-3 text-sm hover:border-foreground transition">Continue with Google</button>
            <button className="w-full border border-border rounded-full py-3 text-sm hover:border-foreground transition">Continue with Apple</button>
          </div>

          <div className="mt-8 text-sm text-center text-muted-foreground">
            {mode === "signin" ? "New to LUXE? " : "Already a member? "}
            <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className={cls("underline-grow", "text-foreground")}>
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </div>
          <div className="text-center mt-6">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">{label}</label>
      <input type={type} className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm outline-none focus:border-gold transition" />
    </div>
  );
}
