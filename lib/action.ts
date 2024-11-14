"use server"
import { z } from "zod"
import {put} from "@vercel/blob"
import {prisma} from "@/lib/prisma"

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z.instanceof(File)
  .refine((file) => file.size > 0, { message: "Image is required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "Only images are allowed" })
  .refine((file) => file.size < 4000000, { message: "Image must less than 4mb"})
})

export const uploadImage = async (prevState: unknown, formData: FormData) => {
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
 
