import { PageIn } from './PageIn';

export class PageInResponse<T> extends PageIn  {
  totalCount: number = 0;
  results: T[] = [];
}
