import { ExecutionContext } from '@nestjs/common';

export default interface RequestContextUser extends ExecutionContext {
  user?: any;
}