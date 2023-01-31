import { IPaginationBase } from ".";

export class Pagination<T> implements IPaginationBase<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  firstPage: number;
  lastPage: number;
  items: T[] | undefined;

  constructor(
    currentPage: number,
    pageSize: number,
    totalItems?: number,
    lastPage?: number,
    totalPages?: number,
    items?: T[] | undefined
  ) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.firstPage = 1;
    this.lastPage = lastPage ?? 0;
    this.totalItems = totalItems ?? 0;
    this.totalPages = totalPages ?? 0;
    this.items = items;
  }

  public async createPagination<T, FT>(
    model: any,
    filter: FT
  ): Promise<Pagination<T>> {
    if (!model)
      throw Error(
        `createPagination(): model got null or undefined but expect primsa model type!`
      );
    const skip = (this.currentPage - 1) * this.pageSize;
    const itemCountPromise = model.count();
    const dataPromise = model.findMany({
      take: this.pageSize,
      skip,
      ...filter,
    }) as Promise<T[]>;

    const [count, items] = await Promise.all([itemCountPromise, dataPromise]);
    const totalPages = Math.ceil(count / this.pageSize);
    return new Pagination<T>(
      this.currentPage,
      this.pageSize,
      count,
      totalPages,
      totalPages,
      items
    );
  }
}
