import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { dbConnect } from '../../../helpers/dbProvider';
import { verifyPassword } from '../../../helpers/auth';

export default NextAuth({
  session: {
    jwt: { signingKey: process.env.JWT_SIGNING_PRIVATE_KEY },
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await dbConnect();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();

        return { email: user.email };
      },
    }),
  ],
});
