/**
 * Interface for a successful response.
 * @interface
 */
export type ISuccessResponse = {
  status: number;
  message: string;
  data: object | any;
  meta?: any;
  request?: {
    url?: string;
    method?: string;
    topics?: string;
  };
};

/**
 * Interface for an error response.
 * @interface
 */
export type IErrorResponse = {
  status: number;
  message: string;
  error: object | any;
  request: {
    url: string;
    method: string;
  };
};
