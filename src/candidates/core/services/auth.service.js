import axios from 'axios';
import Auth from '@/core/services/auth.service';
import {
  AxiosInterceptor
} from '@/candidates/core/services/axios-interceptor.service';

const axiosSettings = {
  baseURL: process.env.API_CANDIDATES_BASE_URL,
  withCredentials: true,
  headers: {
    'X-Devv-Auth': {
      toString () {
        return localStorage.getItem('token');
      }
    }
  }
};
let axiosCandidates = axios.create(axiosSettings);

let interceptor = new AxiosInterceptor(axiosCandidates);

interceptor.build();

export default new Auth(axiosCandidates);
