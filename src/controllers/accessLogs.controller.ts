import { Request, Response } from "express";
import * as accessLogsService from "../services/accessLogs.service";

export const recognizeFace = async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required"
      });
    }

    const result = await accessLogsService.recognizeAndLogAccess(
      req.file
    );

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Recognition error"
    });
  }
};
