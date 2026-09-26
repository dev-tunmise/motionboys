import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";

function formatNaira(amount: number) {
  return "₦" + amount.toLocaleString("en-NG");
}

type ShippingInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
};

const initialShipping: ShippingInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
};

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [shipping, setShipping] = useState<ShippingInfo>(initialShipping);
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">Cart is Empty</h1>
          <p className="text-muted-foreground text-sm">Add items to your cart before checking out.</p>
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  const deliveryFee = totalPrice >= 50000 ? 0 : 2500;
  const orderTotal = totalPrice + deliveryFee;

  const update = (field: keyof ShippingInfo, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateShipping = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!shipping.firstName.trim()) newErrors.firstName = "Required";
    if (!shipping.lastName.trim()) newErrors.lastName = "Required";
    if (!shipping.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) newErrors.email = "Valid email required";
    if (!shipping.phone.trim()) newErrors.phone = "Required";
    if (!shipping.address.trim()) newErrors.address = "Required";
    if (!shipping.city.trim()) newErrors.city = "Required";
    if (!shipping.state.trim()) newErrors.state = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayWithPaystack = () => {
    if (!validateShipping()) return;
    setStep("payment");
  };

  const launchPaystack = () => {
    setProcessing(true);
    const handler = (window as any).PaystackPop?.setup({
      key: "pk_test_REPLACE_WITH_YOUR_KEY",
      email: shipping.email,
      amount: orderTotal * 100, // Paystack uses kobo
      currency: "NGN",
      ref: "MB_" + Date.now(),
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "name", value: `${shipping.firstName} ${shipping.lastName}` },
          { display_name: "Phone", variable_name: "phone", value: shipping.phone },
          { display_name: "Address", variable_name: "address", value: `${shipping.address}, ${shipping.city}, ${shipping.state}` },
        ]
      },
      callback: () => {
        clearCart();
        setProcessing(false);
        window.location.href = "/order-success";
      },
      onClose: () => {
        setProcessing(false);
      },
    });
    handler?.openIframe();
  };

  return (
    <>
      <script src="https://js.paystack.co/v1/inline.js" />
      <main className="pt-16 min-h-screen">
        <div className="container py-8 max-w-5xl">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>

          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-8">Checkout</h1>

          <div className="flex items-center gap-4 mb-10">
            <StepIndicator icon={<Truck className="w-4 h-4" />} label="Delivery" active={step === "shipping"} done={step === "payment"} />
            <div className="flex-1 h-px bg-border" />
            <StepIndicator icon={<CreditCard className="w-4 h-4" />} label="Payment" active={step === "payment"} done={false} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              {step === "shipping" ? (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-semibold tracking-wider uppercase">Delivery Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="First Name" value={shipping.firstName} onChange={(v) => update("firstName", v)} error={errors.firstName} />
                    <FormField label="Last Name" value={shipping.lastName} onChange={(v) => update("lastName", v)} error={errors.lastName} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Email" type="email" value={shipping.email} onChange={(v) => update("email", v)} error={errors.email} />
                    <FormField label="Phone (WhatsApp)" type="tel" value={shipping.phone} onChange={(v) => update("phone", v)} error={errors.phone} />
                  </div>
                  <FormField label="Address" value={shipping.address} onChange={(v) => update("address", v)} error={errors.address} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="City" value={shipping.city} onChange={(v) => update("city", v)} error={errors.city} />
                    <FormField label="State" value={shipping.state} onChange={(v) => update("state", v)} error={errors.state} />
                  </div>
                  <button
                    onClick={handlePayWithPaystack}
                    className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity"
                  >
                    Continue to Payment
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold tracking-wider uppercase">Payment</h2>
                    <button onClick={() => setStep("shipping")} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      Edit Delivery Info
                    </button>
                  </div>

                  <div className="bg-card border border-border p-4 text-sm space-y-1">
                    <p className="font-medium">{shipping.firstName} {shipping.lastName}</p>
                    <p className="text-muted-foreground">{shipping.address}</p>
                    <p className="text-muted-foreground">{shipping.city}, {shipping.state}</p>
                    <p className="text-muted-foreground">{shipping.email} · {shipping.phone}</p>
                  </div>

                  <div className="bg-card border border-border p-6 space-y-3">
                    <p className="font-display text-sm font-semibold tracking-wider uppercase">Pay with Paystack</p>
                    <p className="text-sm text-muted-foreground">You'll be redirected to Paystack's secure payment page. Pay with card or bank transfer.</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Secured by Paystack. Your card details are never stored.</span>
                    </div>
                  </div>

                  <button
                    onClick={launchPaystack}
                    disabled={processing}
                    className="w-full bg-primary text-primary-foreground py-3 font-display text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {processing ? "Opening Paystack..." : `Pay ${formatNaira(orderTotal)}`}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border p-6 space-y-6 lg:sticky lg:top-24">
                <h2 className="font-display text-sm font-semibold tracking-wider uppercase">Order Summary</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-14 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size} / {item.color} × {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium shrink-0">{formatNaira(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatNaira(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryFee === 0 ? "Free" : formatNaira(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between font-display font-semibold text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{formatNaira(orderTotal)}</span>
                  </div>
                </div>
                {totalPrice < 50000 && (
                  <p className="text-[10px] text-muted-foreground tracking-wider uppercase text-center">
                    Free delivery on orders above ₦50,000
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function FormField({
  label, value, onChange, error, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; error?: string; type?: string;
}) {
  return (
    <div>
      <label className="text-xs font-display tracking-wider uppercase text-muted-foreground mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-secondary text-foreground px-3 py-2.5 text-sm border transition-colors focus:outline-none ${
          error ? "border-limited-drop" : "border-border focus:border-foreground"
        }`}
      />
      {error && <p className="text-limited-drop text-[10px] mt-1">{error}</p>}
    </div>
  );
}

function StepIndicator({ icon, label, active, done }: { icon: React.ReactNode; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? "text-foreground" : done ? "text-accent" : "text-muted-foreground"}`}>
      {icon}
      <span className="text-xs font-display font-medium tracking-wider uppercase hidden sm:inline">{label}</span>
    </div>
  );
}
