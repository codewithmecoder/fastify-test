import { Prisma, PrismaClient } from "@prisma/client";
import { fieldEncryptionMiddleware } from "prisma-field-encryption";

const prisma = new PrismaClient();
prisma.$use(
  fieldEncryptionMiddleware({
    dmmf: Prisma.dmmf
  })
)
export default prisma;
