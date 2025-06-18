import { z } from "zod"

export const validationSchema = z.object({
    name: z.string().nonempty({
        message: "名前は必須です。"
    }).max(10, {
        message: "名前の最大文字は10文字までです"
    })
})