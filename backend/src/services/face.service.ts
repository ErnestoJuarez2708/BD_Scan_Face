import prisma from "../lib/prisma";

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
    throw new Error("Usuario no encontrado");
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
