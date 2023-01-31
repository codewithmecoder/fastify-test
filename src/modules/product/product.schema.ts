import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const querystring = z.object({
  page: z.number().default(1).optional(),
  pageSize: z.number().default(20).optional(),
});

const productInput = {
  title: z.string(),
  price: z.number(),
  content: z.string().optional(),
};

const productGenerated = {
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
};

const createProductSchema = z.object({
  ...productInput,
});

const productResponseSchema = z.object({
  ...productInput,
  ...productGenerated,
});

const productsResponseSchema = z.array(productResponseSchema);

const paginationResponseSchema = z.object({
  // pagination: z.object({
  currentPage: z.number(),
  pageSize: z.number(),
  firstPage: z.number(),
  lastPage: z.number(),
  totalItems: z.number(),
  totalPages: z.number(),
  // }),

  items: z.array(productResponseSchema),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type Querystring = z.infer<typeof querystring>;
export type PaginationRes = z.infer<typeof paginationResponseSchema>;

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
  createProductSchema,
  productResponseSchema,
  productsResponseSchema,
  paginationResponseSchema,
});
