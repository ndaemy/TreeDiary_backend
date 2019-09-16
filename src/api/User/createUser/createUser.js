import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, username } = args;
      const user = await prisma.createUser({ email, username });
      return user;
    }
  }
};
