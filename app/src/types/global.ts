export type TMetaPagination = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
};

export type TPagination<T> = {
  data: T[];
  meta: TMetaPagination;
};

export type TResponse<T> = {
  data: T;
};

export type TPaginationParams = {
  page: number;
  per_page: number;
};
