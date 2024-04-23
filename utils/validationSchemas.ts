import * as z from 'zod'


const signUpSchema = z.object({
  fullname: z.string().trim().min(5, {message: 'Minimum of 5 characters'}).toLowerCase(),
  email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email address'}).trim().toLowerCase(),
  password: z.string().min(8, {message: 'Password must be atleast 8 characters'})
});

const signInSchema = z.object({
  email: z.string().min(1, {message: 'Email is required'}).email({message: 'Invalid email address'}).trim().toLowerCase(),
  password: z.string().min(8, {message: 'Password must be atleast 8 characters'})
});

export { signInSchema, signUpSchema}

