"use server"
import { z } from "zod"
import {del, put} from "@vercel/blob"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getImageById } from "@/lib/data"
  
const UploadSchema = z.object({
  title: z.string().min(1),
  image: z.instanceof(File)
  .refine((file) => file.size > 0, { message: "Image is required" })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "Only images are allowed" })
  .refine((file) => file.size < 4000000, { message: "Image must less than 4mb"})
} )

const EditSchema = z.object({
  title: z.string().min(1),
  image: z.instanceof(File)
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "Only images are allowed" })
  .refine((file) => file.size < 4000000, { message: "Image must less than 4mb"}).optional()
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

  const { title, image } = validatedFields.data 
  const { url } = await put( image.name, image, {
    access: "public",
    multipart: true
  } )
  try {
    await prisma.upload.create( {
      data: {
        title,
        image:url
      }
    })
  } catch (error) {
    return {message: "Failed to create data"}
  }

  revalidatePath( "/" )
  redirect("/")
}

export const deleteImage = async (id: string): Promise<void> => {
  const data = await getImageById(id);
  if (!data) {
    throw new Error("No data found");
  }

  await del(data.image);
  try {
    await prisma.upload.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to delete data:", error);
    throw new Error("Failed to delete data");
  }

  revalidatePath("/");
};

export const updateImage = async (id:string,prevState: unknown, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
    Object.fromEntries(formData.entries())
  )
  if ( !validatedFields.success )
  {
    return {
      error: validatedFields.error.flatten().fieldErrors
    }
  }

  const { title, image } = validatedFields.data 
  const { url } = await put( image.name, image, {
    access: "public",
    multipart: true
  } )
  try {
    await prisma.upload.create( {
      data: {
        title,
        image:url
      }
    })
  } catch (error) {
    return {message: "Failed to create data"}
  }

  revalidatePath( "/" )
  redirect("/")
}

 
