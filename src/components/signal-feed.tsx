import Link from "next/link";
import type { AlertEvent, AlertSeverity } from "@/lib/types";
import { ALERT_TYPE_LABELS } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

const SEVERITY_DOT: Record<AlertSeverity, string> = {
  info: "dot-healthy",
  warning: "dot-watch",
  critical: "dot-stress",
};

const SEVERITY_TEXT: Record<AlertSeverity, string> = {
  info: "text-green-500",
  warning: "text-amber-500",
  critical: "text-red-500",
};

const SEVERITY_BG: Record<AlertSeverity, string> = {
  info: "",
  warning: "",
  critical: "bg-red-500/5 border-l-2 border-l-red-500/30",
};

export function SignalFeed({ alerts }: { alerts: AlertEvent[] }) {
  const unacknowledgedCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="label-upper text-foreground">Signal Feed</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {alerts.length} alerts in trailing 7 days
          </p>
        </div>
        {unacknowledgedCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan/15 px-1.5 text-[10px] font-bold text-cyan">
            {unacknowledgedCount}
          </span>
        )}
      </div>
      <div className="divide-y divide-border">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-3 px-5 py-3 text-sm transition-colors ${SEVERITY_BG[alert.severity]} ${!alert.acknowledged ? "bg-cyan/[0.02]" : ""}`}
          >
            <span className={`mt-1.5 shrink-0 ${SEVERITY_DOT[alert.severity]}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/games/${alert.gameId}`}
                  className="font-medium text-foreground text-xs hover:text-cyan transition-colors"
                >
                  {alert.gameName}
                </Link>
                <span className={`label-upper-sm ${SEVERITY_TEXT[alert.severity]}`}>
                  {ALERT_TYPE_LABELS[alert.alertType]}
                </span>
                {!alert.acknowledged && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-dot" />
                )}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {alert.title}
              </p>
            </div>
            <span className="shrink-0 text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
              {formatDistanceToNow(new Date(alert.triggeredAt), { addSuffix: true })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
