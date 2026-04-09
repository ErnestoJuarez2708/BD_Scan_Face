import { useState, useEffect } from "react";
import { socket } from "./services/socket";

import BuhoComponent from "./component/BuhoComponent";
import UpbLogo from "./assets/upb.png";
import CamaraModal from "./component/CamaraModal";
import CaptureModal from "./component/CaputureModal";
import WelcomeModal from "./component/WelcomeModal";

function App() {
  const [openCam, setOpenCam] = useState(false);
  const [openCapture, setOpenCapture] = useState(false);

  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("WS conectado:", socket.id);
    });

    socket.on("access_success", (data) => {
      const nombre = data.data.nombre;

      setUserName(nombre);
      setWelcomeOpen(true);
    });

    socket.on("access_error", () => {
      console.log("Error en la identificación");
    });

    return () => {
      socket.off("connect");
      socket.off("access_success");
      socket.off("access_error");
    };
  }, []);

  // Auto cerrar popup después de 4s
  useEffect(() => {
    if (welcomeOpen) {
      const timer = setTimeout(() => {
        setWelcomeOpen(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [welcomeOpen]);

  const handleCloseCam = () => {
    setOpenCam(false);
  };

  const handleCapturePhoto = (image: string) => {
    console.log("Foto de registro:", image);
  };

  return (
    <div className="bg-[#ffffff] min-h-screen flex flex-col md:flex-row">
      
      <BuhoComponent />

      <div
        className="
          w-full md:w-1/2
          flex flex-col justify-center items-center p-8
          shadow-lg
          rounded-t-[4.5rem] md:rounded-t-none md:rounded-l-[4.5rem]
          grow
        "
        style={{ backgroundColor: "#160660" }}
      >
        <div className="text-center space-y-6 w-full max-w-md">
          <img src={UpbLogo} alt="Upb" className="mx-auto h-16" />

          <p className="text-base sm:text-lg mt-4 text-white font-semibold">
            Bienvenido a la plataforma de identificación biométrica de la UPB
          </p>
        </div>
      </div>

      <CamaraModal isOpen={openCam} onClose={handleCloseCam} />

      <CaptureModal
        isOpen={openCapture}
        onClose={() => setOpenCapture(false)}
        onCapture={handleCapturePhoto}
      />

      <WelcomeModal
        isOpen={welcomeOpen}
        name={userName}
        onClose={() => setWelcomeOpen(false)}
      />
    </div>
  );
}

export default App;