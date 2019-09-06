import { generateSecret } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const emailSecret = generateSecret();
      console.log(emailSecret);
      try {
        await prisma.updateUser({ data: { emailSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
