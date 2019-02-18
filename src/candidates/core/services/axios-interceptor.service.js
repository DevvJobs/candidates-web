import ErrorReporting from '@/candidates/core/services/error-reporting.service';

const errorReport = (error) => {
  if (error.response) {
    return error.response.request.responseText;
  } else {
    return error;
  }
};

export class AxiosInterceptor {
  constructor (axiosClient) {
    this.axiosClient = axiosClient;
  }

  build () {
    /**
     * Request Interceptor
     */
    this.axiosClient.interceptors.request.use((config) => {
      return config;
    }, (error) => {
      ErrorReporting(errorReport(error));

      return Promise.reject(error);
    });

    /**
     * Response Interceptor
     */
    this.axiosClient.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      ErrorReporting(errorReport(error));

      return Promise.reject(error);
    });
  }
}
