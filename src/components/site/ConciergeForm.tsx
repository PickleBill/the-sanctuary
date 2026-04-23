import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  contactMethod: z.enum(["Email", "Phone", "Signal"]),
  role: z.enum(["Principal", "Executive Assistant", "Medical Professional"]),
  message: z.string().trim().max(1000).optional(),
});

export function ConciergeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      contactMethod: fd.get("contactMethod"),
      role: fd.get("role"),
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please review your details.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="concierge-form"
      className="py-28 lg:py-40 bg-background scroll-mt-24"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5"><span className="luxe-rule mr-3" /> Concierge</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
              Initiate Your Private Consultation.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              All inquiries are handled with absolute confidentiality by our
              executive intake team. No records are created until you instruct
              us to proceed.
            </p>

            <div className="mt-10 space-y-4 text-sm text-muted-foreground">
              <p className="flex gap-3"><span className="text-amber">◆</span> 24/7 secure intake line</p>
              <p className="flex gap-3"><span className="text-amber">◆</span> Encrypted messaging available</p>
              <p className="flex gap-3"><span className="text-amber">◆</span> Response within four hours</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-border bg-secondary p-10 lg:p-12">
                <p className="eyebrow mb-5">Received</p>
                <h3 className="font-serif text-2xl lg:text-3xl text-foreground mb-5">
                  Thank you.
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your request has been encrypted and sent. A member of our
                  executive concierge team will contact you within four hours
                  using your preferred method.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6" noValidate>
                <Field label="Name">
                  <input
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber transition-colors"
                  />
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label="Preferred Contact Method">
                    <select
                      name="contactMethod"
                      defaultValue="Email"
                      className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground focus:outline-none focus:border-amber transition-colors"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>Signal</option>
                    </select>
                  </Field>

                  <Field label="Role">
                    <select
                      name="role"
                      defaultValue="Principal"
                      className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground focus:outline-none focus:border-amber transition-colors"
                    >
                      <option>Principal</option>
                      <option>Executive Assistant</option>
                      <option>Medical Professional</option>
                    </select>
                  </Field>
                </div>

                <Field label="Message">
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="Any specific privacy or medical requirements?"
                    className="w-full bg-transparent border-b border-border px-1 py-3 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-amber transition-colors resize-none"
                  />
                </Field>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.24em] uppercase font-semibold hover:bg-amber transition-colors duration-500 mt-4"
                >
                  Submit Secure Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] tracking-[0.28em] uppercase text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
