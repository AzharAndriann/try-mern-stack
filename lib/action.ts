"use server"
import { error } from "console"
import { z } from "zod"

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z.instanceof(File)
  .refine((file) => file.size > 0, { message: "Image is required" })
  .refine((file) => file.type.startsWith("image/"), { message: "Only images are allowed" })
  .refine((file) => file.size < 4000000, { message: "Image must less than 4mb"})
})

export const uploadImage = async (formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if ( !validatedFields.success )
  {
    return {
      error: validatedFields.error.flatten().fieldErrors
    }
  }
 }