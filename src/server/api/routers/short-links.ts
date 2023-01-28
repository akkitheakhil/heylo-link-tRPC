import { slugsUUID } from "@/utils/common-utils";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const shortLinksRouter = createTRPCRouter({
  createShortLink: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(({ ctx, input }) => {
      const slug = slugsUUID();
      const data = {
        slug,
        url: input.url,
      };
      return ctx.prisma.shortLinks.create({
        data,
        select: {
          slug: true,
        },
      });
    }),

  getShortLink: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input: slug }) => {
      return await ctx.prisma.shortLinks.findUnique({
        where: {
          slug,
        },
        select: {
          slug: true,
          url: true,
        },
      });
    }),
});
