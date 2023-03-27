import { FastifyReply, FastifyRequest } from "fastify";
import { CreateProductInput, Querystring } from "./product.schema";
import { createProduct, getProducts } from "./product.service";

export async function createProductHandler(
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) {
  console.log(request.body);
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
}

export async function getProductsHandler(
  request: FastifyRequest<{ Querystring: Querystring }>
) {
  const products = await getProducts(request);
  // console.log(products);

  return products;
}
