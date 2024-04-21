import { ExecutionContext } from '@nestjs/common';

export default interface RequestContext extends ExecutionContext {
  user?: any;
}