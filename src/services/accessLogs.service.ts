import prisma from "../lib/prisma";

interface AccessData {
  nombre: string;
  fecha?: string;
  accurrancy: number;
  device_id: number;
}


export const recognizeAndLogAccess = async (data: AccessData) => {
  const { nombre, fecha, accurrancy, device_id } = data;

  const user = await prisma.user.findFirst({
    where: {
      first_name: nombre
    }
  });

  if (!user) {
    throw { status: 404, message: `Usuario con el nombre '${nombre}' no encontrado` };
  }

  const status = accurrancy > 80 ? "granted" : "denied";

  const log = await prisma.accessLog.create({
    data: {
      user_id: user.user_id,
      device_id: device_id,
      confidence: accurrancy,
      access_type: "external_recognition", 
      status: status,
      enterCode: false,
      access_date: fecha ? new Date(fecha) : new Date() 
    }
  });

  return {
    name: user.first_name,
    confidence: accurrancy,
    status,
    log_id: log.log_id,
    access_date: log.access_date
  };
};