import { SortablePageIn } from './SortablePageIn';

export class SortablePageInResponse<T> extends SortablePageIn  {
  totalCount: number = 0;
  results: T[] = [];
}
