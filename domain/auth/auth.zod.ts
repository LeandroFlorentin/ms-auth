import { z, createObjectZod } from '../../infrastructure/zod/index';

const options = {
  username: z.string().min(1, 'Ingrese al menos un caracter.'),
};

export default createObjectZod(options);
