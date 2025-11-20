// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  enableLogs: true,
  beforeSendLog: (log) => {
    if (log.level === "error" || log.level === "fatal") {
      return log; // error, fatal만 전송
    }
    return null; // 나머지 trace/debug/info/warn은 무시
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
