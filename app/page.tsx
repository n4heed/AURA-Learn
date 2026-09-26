import { BrainCircuit, HandHeart, Route } from "lucide-react";
import { redirect } from "next/navigation";
import { LogoMark, Logo } from "@/components/brand/Logo";
import { DemoLoginCard, type DemoAccount } from "@/components/auth/DemoLoginCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getCurrentUser } from "@/lib/auth";
import { listDemoAccounts } from "@/lib/repo";
import { homeFor } from "@/lib/session";

export const dynamic = "force-dynamic";

const pillars = [
  { icon: Route, title: "A path built around you", text: "AURA maps what you know and unlocks what's next." },
  { icon: BrainCircuit, title: "Examples in your world", text: "Space, sports, gaming. Same maths, your story." },
  { icon: HandHeart, title: "A teacher when it counts", text: "AURA spots the struggle. A human steps in." },
];

export default async function LoginPage() {
  const current = await getCurrentUser();
  if (current) redirect(homeFor(current.role));

  const accounts: DemoAccount[] = listDemoAccounts().map((u) => ({
    id: u.id,
    name: u.name,
    role: u.role,
    subtitle: u.role === "student" ? `Grade ${u.grade} · ${u.school}` : `Class 9A · ${u.school}`,
  }));

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel */}
      <section className="relative overflow-hidden px-6 py-8 sm:px-10 lg:flex lg:flex-col lg:justify-between lg:px-16 lg:py-14">
        <div className="pointer-events-none absolute -left-40 -top-40 hidden size-[38rem] lg:block" aria-hidden>
          <div className="absolute inset-0 animate-aura-pulse rounded-full border border-brand/15" />
          <div className="absolute inset-16 animate-aura-pulse rounded-full border border-brand/20 [animation-delay:-2s]" />
          <div className="absolute inset-32 animate-aura-pulse rounded-full border border-accent/25 [animation-delay:-4s]" />
        </div>

        <div className="relative flex items-center justify-between">
          <Logo />
          <ThemeToggle className="lg:hidden" />
        </div>

        <div className="relative mt-10 max-w-xl lg:mt-0">
          <p className="t-eyebrow mb-4">Adaptive Understanding &amp; Responsive Assistance</p>
          <h1 className="t-display">
            Learn your way.
            <br />
            <span className="text-brand">Master at your pace.</span>
          </h1>
          <p className="t-body mt-5 max-w-md text-base">
            One outcome for every student, a different path to get there.
          </p>
        </div>

        <ul className="relative mt-10 hidden gap-4 lg:grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block font-semibold">{title}</span>
                <span className="t-small">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Sign-in panel */}
      <section className="relative flex items-center justify-center px-6 pb-12 pt-4 sm:px-10 lg:bg-subtle/60 lg:py-14">
        <div className="absolute right-6 top-6 hidden lg:block">
          <ThemeToggle />
        </div>
        <div className="enter w-full max-w-md">
          <div className="mb-6 flex items-center gap-3">
            <LogoMark className="size-9" />
            <div>
              <h2 className="t-heading text-xl">Jump into the demo</h2>
              <p className="t-small">Pick who you want to be. No password needed.</p>
            </div>
          </div>
          <DemoLoginCard accounts={accounts} />
        </div>
      </section>
    </div>
  );
}
