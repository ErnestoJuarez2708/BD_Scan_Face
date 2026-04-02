import { Request, Response } from "express";
import * as accessLogsService from "../services/accessLogs.service";


export const registerAccess = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nombre, fecha, accurrancy, device_id } = req.body;

    if (!nombre || accurrancy === undefined) {
      return res.status(400).json({
        message: "Nombre y accurrancy son obligatorios en el body"
      });
    }

    const result = await accessLogsService.recognizeAndLogAccess({
      nombre,
      fecha,
      accurrancy,
      device_id: device_id || 1
    });

    return res.json(result);

  } catch (error: any) {
    console.error(error);
    
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
      message: error.message || "Error al registrar el acceso"
    });
  }
};