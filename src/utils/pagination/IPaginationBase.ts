export interface IPaginationBase<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  firstPage: number;
  lastPage: number;
  items: T[] | undefined;
}
