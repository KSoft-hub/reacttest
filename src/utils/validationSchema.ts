import { z } from "zod"

export const validationSchema = z.object({
    name: z.string().nonempty({
        message: "名前は必須です。"
    })
})