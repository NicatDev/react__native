import { z } from "zod";

export const addResourceSchema = z.object({
  id: z.number(),
  type: z.enum(["tv", "internet", "voice"]),
  task: z.number(),
  warehouse: z.string({ message: "Anbarı seçin..." }).nullable(),
  item: z.string({ message: "Məhsulu seçin..." }),
  count: z.string({ message: "Sayı daxil edin..." }).regex(/^\d+$/, { message: "Daxil edilən say düzgün deyil..." })
});

export type AddResourceSchema = z.infer<typeof addResourceSchema>;
