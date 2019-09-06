import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createUser: async (_, args) => {
      const { email, username, password } = args;
      const user = await prisma.createUser({ email, username, password });
      return user;
    }
  }
};
