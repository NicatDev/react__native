import { z } from "zod";

import { emailSchema } from "./email.schema";

export const signInSchema = emailSchema
  .extend({
    password: z
      .string({ message: "Şifrə daxil edilməsi zəruridir." })
      .min(8, { message: "Şifrə minimum 8 simvoldan ibarət olmalıdır" })
  })
  .strict();

export type SignInSchema = z.infer<typeof signInSchema>;
