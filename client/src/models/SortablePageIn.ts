import { PageIn } from './PageIn';
import { SortDirection } from './SortDirection';

export class SortablePageIn extends PageIn  {
  sortBy: string = '';
  sortOrder: SortDirection = SortDirection.Asc;

  constructor(data?: object) {
    super();
    Object.assign(this, data);
  }
}
