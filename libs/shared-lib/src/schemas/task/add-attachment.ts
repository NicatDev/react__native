import { z } from "zod";

const imagePickerSchema = z.object(
  {
    uri: z.string(),
    assetId: z.string().optional().nullable(),
    width: z.number(),
    height: z.number(),
    type: z.union([z.literal("image"), z.literal("video")]).optional(),
    fileName: z.string().optional().nullable(),
    fileSize: z.number().optional(),
    exif: z.record(z.any()).optional().nullable(),
    base64: z.string().optional().nullable(),
    duration: z.number().optional().nullable(),
    mimeType: z.string().optional()
  },
  { message: "Şəkilin yüklənməsi məcburidir." }
);

const baseAttachmentSchema = z.object({
  id: z.number().optional(),
  modem_SN: z.string({ message: "Bu sahənin doldurulmasi məcburidir" }),
  passport: imagePickerSchema,
  photo_modem: imagePickerSchema,
  note: z.string().optional()
});

const tvAttachmentSchema = baseAttachmentSchema.extend({ type: z.literal("tv") });

const internetAttachmentSchema = baseAttachmentSchema.extend({
  type: z.literal("internet"),
  siqnal: z.string({ message: "Bu sahənin doldurulmasi məcburidir" }),
  internet_packs: z.string({ message: "Bu sahənin doldurulmasi məcburidir" })
});

const voiceAttachmentSchema = baseAttachmentSchema.extend({
  type: z.literal("voice"),
  home_number: z.string({ message: "Bu sahənin doldurulmasi məcburidir" }),
  password: z.string({ message: "Bu sahənin doldurulmasi məcburidir" })
});

export const taskAddAttachmentSchema = z.discriminatedUnion("type", [
  tvAttachmentSchema,
  internetAttachmentSchema,
  voiceAttachmentSchema
]);

export type AddAdditionSchema = z.infer<typeof taskAddAttachmentSchema>;
export type TVAttachmentSchema = z.infer<typeof tvAttachmentSchema>;
export type InternetAttachmentSchema = z.infer<typeof internetAttachmentSchema>;
export type VoiceAttachmentSchema = z.infer<typeof voiceAttachmentSchema>;
