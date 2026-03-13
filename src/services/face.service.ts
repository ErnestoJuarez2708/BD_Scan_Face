import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

console.log('DATABASE_URL desde env:', process.env.DATABASE_URL);
console.log('Tipo de DATABASE_URL:', typeof process.env.DATABASE_URL);

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

interface RegisterFaceInput {
  userId: number;
  encoding: string;
  imagePath: string | null;
}

export const registerUserFace = async (input: RegisterFaceInput) => {
  const userExists = await prisma.user.findUnique({
    where: { user_id: input.userId },
    select: { user_id: true },
  });

  if (!userExists) {
    throw new Error('Usuario no encontrado');
  }

  const face = await prisma.face.create({
    data: {
      user_id: input.userId,
      encoding: input.encoding,
      image_path: input.imagePath,
    },
  });

  return face;
};