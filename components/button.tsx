"use-client"
import { useFormState, useFormStatus } from "react-dom"

export const SubmitButton = () =>
{
  const {pending} = useFormStatus()
  return (
    <button className='bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600' disabled={pending} type='submit'>upload</button>
  )
}