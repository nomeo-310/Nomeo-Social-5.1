import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { fetchUserByEmail } from '@/actions/data.actions';
import clientPromise from '@/utils/mongoDBClientPromise';
import { signInSchema } from '@/utils/validationSchemas';
import { rawUserData } from '@/types';


export const authOptions:AuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'}, 
      },
      //@ts-ignore
      async authorize(credentials) {
        const validLoginDetails = signInSchema.safeParse(credentials);
        
        if (validLoginDetails.success) {
          const { email, password } = validLoginDetails.data;

          const user:rawUserData | null = await fetchUserByEmail(email);

          if (!user || !user.hashedPassword) {
            throw new Error('Invalid credentials')
          }

          const passwordMatches = await bcrypt.compare(password, user.hashedPassword);

          if (!passwordMatches) {
            throw new Error('Wrong password! check your password');
          }

          if (passwordMatches) {
            return user
          }
        }

        return null;
      }
    })
  ],
  pages: { signIn: '/sign-in' },
  session: { strategy: 'jwt'},
  secret: process.env.NEXTAUTH_SECRET,
}