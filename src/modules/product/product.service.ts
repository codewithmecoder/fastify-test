import { _Date } from "@faker-js/faker/date";
import { Prisma, Product } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { Pagination } from "../../utils/pagination";
import prisma from "../../utils/prisma";
import { CreateProductInput, Querystring } from "./product.schema";

export async function createProduct(
  data: CreateProductInput & { ownerId: number }
) {
  return prisma.product.create({
    data,
  });
}

export async function getProducts(
  request: FastifyRequest<{ Querystring: Querystring }>
) {
  try {
    const currentPage = parseInt(request.query.page?.toString() ?? "0") || 1;
    const pageSize = parseInt(request.query.pageSize?.toString() ?? "0") || 20;
    const data = await new Pagination(currentPage, pageSize).createPagination<
      Product,
      Prisma.ProductFindManyArgs
    >(prisma.product, {
      // where: { id: { lt: 8 } },
      // include: { owner: { select: { email: true, name: true } } },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
