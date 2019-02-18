import { Logger } from '@/candidates/core/services/logger.service';

const isHttp400Error = (e) => {
  return e.response &&
    (e.response.status === 400) &&
    e.response.data.details;
};

const isHttp401Error = (e) => {
  return e.response &&
    (e.response.status === 401);
};

const isExpectedError = (e) => {
  return isHttp400Error(e) || isHttp401Error(e);
};

const ErrorReporting = (error) => {
  if (!isExpectedError(error)) {
    const errorReporting = new Logger(error);
    errorReporting.error();
  };
};

export default ErrorReporting;
