import { AppUsers } from '.prisma/client';

export type FindAppUser = Omit<AppUsers, 'password'>;
