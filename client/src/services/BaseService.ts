import { store } from '../components/App';
import { ResponseError } from '../models/ResponseError';
import { logout } from '../reducers/login/loginActions';
import Api from './Api';

class BaseService {
  api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  handleError(error: ResponseError) {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
    throw {
      status: error.response.status,
      message: error.response.data.message,
      code: error.response.data.code,
    };
  }
}

export default BaseService;
