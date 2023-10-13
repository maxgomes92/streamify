import { init, BrowserTracing, Replay } from "@sentry/react"

const isProduction = process.env.NODE_ENV === "production"

const Sentry = {
  initialize: () => {
    init({
      dsn: "https://4ce8a3a5369ae4d869a6fcae271a86a2@o4505697221541888.ingest.sentry.io/4505697221607424",
      integrations: [
        new BrowserTracing({
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: ["localhost"],
        }),
        new Replay(),
      ],
      enabled: isProduction,
      // Performance Monitoring
      tracesSampleRate: 0.1, // Capture 100% of the transactions, reduce in production!
      // Session Replay
      replaysSessionSampleRate: 0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  }
}

export default Sentry
