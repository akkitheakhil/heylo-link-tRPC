import { shortLinksRouter } from "./routers/short-links";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  ["short-links"]: shortLinksRouter,
});

export type AppRouter = typeof appRouter;
