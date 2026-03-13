import type { Request, Response } from 'express';
import * as faceService from '../services/face.service';

interface RegisterFaceBody {
  encoding: string;
  imagePath?: string;
}

export const registerFace = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { encoding, imagePath } = req.body as RegisterFaceBody;

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ error: 'userId debe ser un número válido' });
    }

    if (!encoding || typeof encoding !== 'string' || encoding.trim() === '') {
      return res.status(400).json({ error: 'El campo encoding es obligatorio y debe ser string' });
    }

    const newFace = await faceService.registerUserFace({
      userId: Number(userId),
      encoding,
      imagePath: imagePath || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Cara registrada correctamente',
      data: newFace,
    });
  } catch (error: any) {
    console.error('[registerFace]', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(500).json({
      error: 'Error al registrar la cara',
      message: error.message || 'Error interno del servidor',
    });
  }
};