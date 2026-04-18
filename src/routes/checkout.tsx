import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, CreditCard, Lock } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { formatPrice, cls } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — LUXE" }] }),
  component: CheckoutPage,
});

const STEPS = ["Address", "Payment", "Review"] as const;
type Step = (typeof STEPS)[number];

function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("Address");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: "", firstName: "", lastName: "", address: "", city: "", state: "", zip: "", country: "United States",
    cardName: "", cardNumber: "", exp: "", cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = cartSubtotal > 150 || cartSubtotal === 0 ? 0 : 12;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;
  const stepIndex = STEPS.indexOf(step);

  const validate = (s: Step): boolean => {
    const e: Record<string, string> = {};
    if (s === "Address") {
      if (!form.email.includes("@")) e.email = "Valid email required";
      if (!form.firstName) e.firstName = "Required";
      if (!form.lastName) e.lastName = "Required";
      if (!form.address) e.address = "Required";
      if (!form.city) e.city = "Required";
      if (!form.zip) e.zip = "Required";
    }
    if (s === "Payment") {
      if (!form.cardName) e.cardName = "Required";
      if (form.cardNumber.replace(/\s/g, "").length < 12) e.cardNumber = "Card number invalid";
      if (!/^\d{2}\/\d{2}$/.test(form.exp)) e.exp = "MM/YY";
      if (form.cvc.length < 3) e.cvc = "CVC";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };

  const placeOrder = () => {
    setDone(true);
    setTimeout(() => {
      clearCart();
    }, 100);
  };

  if (cart.length === 0 && !done) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Your bag is empty</h1>
        <Link to="/shop" className="mt-6 inline-block bg-foreground text-background rounded-full px-6 py-3 text-sm">Browse the boutique</Link>
      </div>
    );
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-xl px-6 py-24 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="mx-auto h-20 w-20 rounded-full bg-gold flex items-center justify-center">
          <Check className="h-10 w-10 text-gold-foreground" />
        </motion.div>
        <h1 className="font-display text-4xl mt-8">Thank you.</h1>
        <p className="mt-4 text-muted-foreground">
          Your order has been placed. A confirmation has been sent to <span className="text-foreground">{form.email || "your email"}</span>.
        </p>
        <div className="mt-8 inline-block border border-border rounded-md px-6 py-4">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Order number</div>
          <div className="font-display text-xl mt-1">LUXE-{Math.floor(Math.random() * 90000 + 10000)}</div>
        </div>
        <div className="mt-10">
          <button onClick={() => navigate({ to: "/" })} className="bg-foreground text-background rounded-full px-7 py-3 text-sm">Back to home</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 py-12">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to bag
      </Link>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-12 max-w-md">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3 flex-1">
            <div className={cls("h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border transition",
              i < stepIndex ? "bg-gold text-gold-foreground border-gold" :
              i === stepIndex ? "bg-foreground text-background border-foreground" :
              "border-border text-muted-foreground"
            )}>
              {i < stepIndex ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <div className={cls("text-sm hidden sm:block", i === stepIndex ? "text-foreground" : "text-muted-foreground")}>{s}</div>
            {i < STEPS.length - 1 && <div className={cls("flex-1 h-px", i < stepIndex ? "bg-gold" : "bg-border")} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Form */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === "Address" && (
                <div>
                  <h2 className="font-display text-3xl mb-8">Shipping address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email" name="email" form={form} setForm={setForm} errors={errors} className="sm:col-span-2" />
                    <Field label="First name" name="firstName" form={form} setForm={setForm} errors={errors} />
                    <Field label="Last name" name="lastName" form={form} setForm={setForm} errors={errors} />
                    <Field label="Address" name="address" form={form} setForm={setForm} errors={errors} className="sm:col-span-2" />
                    <Field label="City" name="city" form={form} setForm={setForm} errors={errors} />
                    <Field label="State" name="state" form={form} setForm={setForm} errors={errors} />
                    <Field label="ZIP" name="zip" form={form} setForm={setForm} errors={errors} />
                    <Field label="Country" name="country" form={form} setForm={setForm} errors={errors} />
                  </div>
                </div>
              )}
              {step === "Payment" && (
                <div>
                  <h2 className="font-display text-3xl mb-2">Payment</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-8">
                    <Lock className="h-3.5 w-3.5" /> Encrypted & secure
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Name on card" name="cardName" form={form} setForm={setForm} errors={errors} className="sm:col-span-2" />
                    <Field
                      label="Card number"
                      name="cardNumber"
                      form={form}
                      setForm={setForm}
                      errors={errors}
                      className="sm:col-span-2"
                      icon={<CreditCard className="h-4 w-4" />}
                      maxLength={19}
                      transform={(v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()}
                    />
                    <Field label="Expiry (MM/YY)" name="exp" form={form} setForm={setForm} errors={errors}
                      transform={(v) => v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2")} maxLength={5} />
                    <Field label="CVC" name="cvc" form={form} setForm={setForm} errors={errors} maxLength={4}
                      transform={(v) => v.replace(/\D/g, "")} />
                  </div>
                </div>
              )}
              {step === "Review" && (
                <div>
                  <h2 className="font-display text-3xl mb-8">Review your order</h2>
                  <div className="space-y-6">
                    <ReviewBlock title="Shipping to">
                      {form.firstName} {form.lastName}<br/>
                      {form.address}<br/>
                      {form.city}, {form.state} {form.zip}<br/>
                      {form.country}
                    </ReviewBlock>
                    <ReviewBlock title="Payment">
                      Card ending in {form.cardNumber.slice(-4)}
                    </ReviewBlock>
                    <ReviewBlock title="Items">
                      <div className="space-y-3">
                        {cart.map((c) => (
                          <div key={`${c.productId}-${c.size}-${c.color}`} className="flex gap-3 text-sm">
                            <img src={c.image} alt="" className="h-14 w-14 rounded object-cover" />
                            <div className="flex-1">
                              <div className="font-medium">{c.name}</div>
                              <div className="text-xs text-muted-foreground">{c.color} · Size {c.size} · Qty {c.qty}</div>
                            </div>
                            <div className="text-sm">{formatPrice(c.price * c.qty)}</div>
                          </div>
                        ))}
                      </div>
                    </ReviewBlock>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-10">
            {stepIndex > 0 && (
              <button onClick={() => setStep(STEPS[stepIndex - 1])} className="border border-border rounded-full px-6 py-3 text-sm hover:border-foreground transition">
                Back
              </button>
            )}
            {step !== "Review" ? (
              <button onClick={next} className="ml-auto bg-foreground text-background rounded-full px-7 py-3 text-sm">
                Continue
              </button>
            ) : (
              <button onClick={placeOrder} className="ml-auto bg-gold text-gold-foreground rounded-full px-7 py-3 text-sm font-medium">
                Place order — {formatPrice(total)}
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="font-display text-xl mb-5">Summary</div>
            <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>{formatPrice(tax)}</span></div>
            </div>
            <div className="flex justify-between text-base">
              <span>Total</span>
              <span className="font-display text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label, name, form, setForm, errors, className, icon, maxLength, transform,
}: {
  label: string; name: string; form: any; setForm: (f: any) => void; errors: Record<string, string>;
  className?: string; icon?: React.ReactNode; maxLength?: number; transform?: (v: string) => string;
}) {
  const err = errors[name];
  return (
    <div className={className}>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">{label}</label>
      <div className="relative">
        <input
          value={form[name]}
          maxLength={maxLength}
          onChange={(e) => {
            const v = transform ? transform(e.target.value) : e.target.value;
            setForm({ ...form, [name]: v });
          }}
          className={cls(
            "w-full bg-background border rounded-md px-4 py-3 text-sm outline-none transition",
            err ? "border-destructive" : "border-border focus:border-gold",
            icon ? "pl-10" : ""
          )}
        />
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</div>}
      </div>
      {err && <div className="text-xs text-destructive mt-1">{err}</div>}
    </div>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-md p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
