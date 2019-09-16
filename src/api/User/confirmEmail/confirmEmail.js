import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
  Mutation: {
    confirmEmail: async (_, args, { request }) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      try {
        if (user.emailSecret === secret) {
          await prisma.updateUser({
            where: { email },
            data: { emailConfirmed: true }
          });
          return generateToken(user.id);
        } else {
          throw Error("Wrong email/secret combination.")
        }
      } catch (error) {
        throw Error(error);
      }
    }
  }
};
