import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateCategoryOptionSchema = extendApi(z.object({ name: z.string().optional() }));

export class UpdateCategoryOptionDto extends createZodDto(updateCategoryOptionSchema) {}
