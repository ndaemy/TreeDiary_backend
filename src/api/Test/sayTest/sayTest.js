import { printSchema } from 'graphql';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    sayTest: async () => {
      console.log(await prisma.users());
      return 'Test';
    }
  }
};
