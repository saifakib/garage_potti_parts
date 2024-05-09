import { IErrorResponse, ISuccessResponse } from '@/types/api.response';
export default class ResponseHelper {
  constructor() {}

  /**
   * Function to send an success response.
   * @function
   * @param {ISuccessResponse} response - The success response object.
   * @returns {ISuccessResponse} - The same success response object.
   */
  successResponse(response: ISuccessResponse): ISuccessResponse {
    return response;
  }

  /**
   * Function to send an error response.
   * @function
   * @param {IErrorResponse} response - The error response object.
   * @returns {IErrorResponse} - The same error response object.
   */
  errorResponse(response: IErrorResponse): IErrorResponse {
    return response;
  }
}
