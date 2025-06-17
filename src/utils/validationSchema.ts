import { z } from "zod"

export const validationSchema = z.object({
    name: z.string().nonempty("名前は必須です。")
})