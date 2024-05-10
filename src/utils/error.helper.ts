import { ERROR_CODES } from '@/config/prismaError.code';
import { HttpException, RequestTimeoutException } from '@nestjs/common';

export default function errorHandler(error: any) {
  switch (error.name) {
    case 'NotFoundException':
    case 'UnauthorizedException':
    case 'ForbiddenException':
    case 'NotAcceptableException':
    case 'RequestTimeoutException':
    case 'ConflictException':
    case 'GoneException':
    case 'HttpVersionNotSupportedException':
    case 'PayloadTooLargeException':
    case 'UnsupportedMediaTypeException':
    case 'UnprocessableEntityException':
    case 'InternalServerErrorException':
    case 'NotImplementedException':
    case 'ImATeapotException':
    case 'MethodNotAllowedException':
    case 'BadGatewayException':
    case 'ServiceUnavailableException':
    case 'GatewayTimeoutException':
    case 'PreconditionFailedException':
    case 'HttpException':
    case 'BadRequestException':
    case 'JsonWebTokenError':
    case 'ServerKafka':
    case 'TokenExpiredError':
    case 'Error':
      return new HttpException(error.message, error.status);
    case 'AbortError':
      return new RequestTimeoutException('Request Timeout');
    case 'PrismaClientKnownRequestError':
      const errorFormat = Object.assign(ERROR_CODES.PRISMA[error.code], { meta: error.meta }); // meta for future use cases log tracking
      return new HttpException(errorFormat, ERROR_CODES.PRISMA[error.code].code);
    default:
      return new HttpException('Internal Server Error!! ', 500);
  }
}
