import prisma from "../lib/prisma";

export const recognizeAndLogAccess = async (
  file: Express.Multer.File
) => {

  /**
   * Aquí deberías llamar a tu modelo de reconocimiento
   * por ahora simulamos resultado
   */

  const recognitionResult = {
    user_id: 1,
    name: "Luis",
    confidence: 91.3
  };

  const status =
    recognitionResult.confidence > 80
      ? "granted"
      : "denied";

  const log = await prisma.accessLog.create({
    data: {
      user_id: recognitionResult.user_id,
      device_id: 1,
      confidence: recognitionResult.confidence,
      access_type: "face",
      status: status,
      enterCode: false
    }
  });

  return {
    name: recognitionResult.name,
    confidence: recognitionResult.confidence,
    status,
    log_id: log.log_id
  };
};
