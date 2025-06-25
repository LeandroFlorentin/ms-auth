import { z, ZodRawShape, ZodError } from 'zod';

export { z, ZodError };

export const createObjectZod = (object: ZodRawShape) => z.object(object);

export const manageMessageZod = ({ errors }: ZodError) => errors.map((error) => error.message);
