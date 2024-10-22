import { z, defineCollection } from "astro:content";
const blogSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

const storeSchema = z.object({
    title: z.string(),
    description: z.string(),
    custom_link_label: z.string(),
    custom_link: z.string().optional(),
    updatedDate: z.coerce.date(),
    pricing: z.string().optional(),
    oldPricing: z.string().optional(),
    badge: z.string().optional(),
    checkoutUrl: z.string().optional(),
    heroImage: z.string().optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });

export const collections = {
    'blog': blogCollection,
    'store': storeCollection
}

const socialsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      url: z.string(),
      order: z.number(),
      icon: z
        .array(
          z.enum([
            "github",
            "twitter",
            "linkedin",
            "instagram",
            "facebook",
            "youtube",
            "twitch",
            "tiktok",
            "snapchat",
            "reddit",
            "pinterest",
            "medium",
            "dev",
            "dribbble",
            "behance",
            "codepen",
            "producthunt",
            "discord",
            "slack",
            "whatsapp",
            "telegram",
            "email",
            "home",
          ]),
        )
        .length(1),
    }),
  });