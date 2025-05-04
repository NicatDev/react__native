import { z } from "zod";

export const emailSchema = z
  .object({
    email: z
      .string({ message: "Elektron poçt daxil edilməlidir" })
      .email({ message: "Elektron poçt düzgün daxil edilməyib" })
  })
  .strict();
