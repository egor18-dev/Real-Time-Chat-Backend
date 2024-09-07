import z from 'zod';

const messageScheme = z.object({
    
    message: z.string({
        invalid_type_error: "Introduce un texto",
        required_error: "Introduce un mensaje"
    })
});

export const validateMessage = (object) => {
    return messageScheme.safeParse(object);
}