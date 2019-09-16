import { generateSecret, sendSecretKey } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const emailSecret = generateSecret();
      const user = await prisma.user({ email });
      try {
        if (!user.emailConfirmed) {
          await prisma.updateUser({ data: { emailSecret }, where: { email } });
          await sendSecretKey(email, emailSecret);
          return true;
        } else {
          throw Error('Email already confirmed.');
        }
      } catch (error) {
        console.log(error);
        throw Error(error);
      }
    }
  }
};
