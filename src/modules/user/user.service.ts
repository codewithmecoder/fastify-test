import { utcDateTime } from "../../utils/date";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, expiredAt, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const dateNow = new Date();
  const ex = dateNow.getTime() + expiredAt * 1000;
  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash, expiredAt: new Date(ex) },
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    where: {
      expiredAt: {
        gt: new Date(),
      },
    },
    // select: {
    //   email: true,
    //   name: true,
    //   id: true,
    // },
  });
}
