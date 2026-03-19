import { alerts } from "@/lib/data/alerts";
import { SignalFeed } from "@/components/signal-feed";

export default function AlertsPage() {
  const sorted = [...alerts].sort(
    (a, b) =>
      new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime()
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Signal Feed</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All alerts across tracked titles
        </p>
      </div>
      <SignalFeed alerts={sorted} />
    </div>
  );
}
