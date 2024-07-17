const { z } = require("zod");

// Creating an object schema
const registerSchema = z.object({

    username: z 
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters." })
        .max(50, { message: "Name must not be more than 50 characters." }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 digits." })
        .max(10, { message: "Phone must not be more than 10 digits." }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least of 8 characters." })
        .max(50, { message: "Password must not be more than 50 characters." }),
});



const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters." })
        .max(255, { message: "Email must not be more than 255 characters." }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least of 8 characters." })
        .max(50, { message: "Password must not be more than 50 characters." }),
});


// We can also use '<Schema-Name>.extend' functionality(of ZOD), for reduce declarations

const contactSchema = z.object({
    username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters." })
    .max(50, { message: "Name must not be more than 50 characters." }),

    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters." })
    .max(255, { message: "Email must not be more than 255 characters." }),

    message: z
    .string({ required_error: "Message is required"})
    .trim()
    .min(3, { message: "Message must be at least of 3 characters." })
    .max(1200, { message: "Message must not be more than 2000 characters." }),
});


module.exports = {registerSchema, loginSchema, contactSchema} ;