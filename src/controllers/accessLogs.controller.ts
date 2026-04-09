import { Request, Response } from "express";
import * as accessLogsService from "../services/accessLogs.service";
import { io } from "../app";

export const registerAccess = async (req: Request, res: Response): Promise<any> => {
  try {
    const { nombre, fecha, accurrancy, device_id } = req.body;

    // ❌ Validación
    if (!nombre || accurrancy === undefined) {
      const errorData = {
        success: false,
        message: "Nombre y accurrancy son obligatorios",
      };

      // 🔥 Emitir error en tiempo real
      io.emit("access_error", errorData);

      return res.status(400).json(errorData);
    }

    // 🚀 Lógica principal
    // const result = await accessLogsService.recognizeAndLogAccess({
    //   nombre,
    //   fecha,
    //   accurrancy,
    //   device_id: device_id || 1
    // });

    const successData = {
      success: true,
      message: "Acceso registrado correctamente",
      data: {
        nombre,
        fecha,
        accurrancy,
        device_id: device_id || 1,
        //result
      }
    };

    // 🔥 Emitir éxito en tiempo real
    io.emit("access_success", successData);

    return res.json(successData);

  } catch (error: any) {
    console.error(error);

    const errorData = {
      success: false,
      message: error.message || "Error al registrar el acceso"
    };

    // 🔥 Emitir error en tiempo real
    io.emit("access_error", errorData);

    const statusCode = error.status || 500;
    return res.status(statusCode).json(errorData);
  }
};