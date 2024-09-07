import z from 'zod';

const userScheme = z.object({
    username: z.string({
        invalid_type_error: "Introduce un texto",
        required_error: "Introduce tu nombre"
    }),
    password: z.string({
        invalid_type_error: "Introduce un texto",
        required_error: "Introduce tu nombre"
    }).min(8, {message: "Introduce una longitud de 8"})
});

export const validateUser = (object) => {
    return userScheme.safeParse(object);
}