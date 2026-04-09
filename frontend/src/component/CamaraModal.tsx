import { useEffect, useRef, useState } from "react";

interface CamaraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CamaraModal: React.FC<CamaraModalProps> = ({ isOpen, onClose }) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);

  const [name, setName] = useState("Esperando detección...");

  // iniciar cámara
  useEffect(() => {
    let stream: MediaStream;

    const startCamera = async () => {
      try {

        console.log("Intentando abrir cámara...");

        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error("Error cámara:", error);
      }
    };

    if (isOpen) startCamera();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };

  }, [isOpen]);


  // capturar frame
  const captureAndSend = async () => {

    console.log("Capturando frame");

    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/jpeg");
    });

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {

      const res = await fetch("http://localhost:3000/api/v1/recognize", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      console.log("Respuesta backend:", data);

      setName(`${data.name} (${data.confidence.toFixed(2)}%)`);

    } catch (error) {

      console.error("Error enviando:", error);

      setName("Error en detección");
    }
  };


  const handleVideoReady = () => {

    console.log("Video listo");

    intervalRef.current = window.setInterval(() => {
      captureAndSend();
    }, 1000);
  };


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 flex flex-col items-center">

        <h2 className="text-xl font-semibold mb-4">📷 Cámara</h2>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          onLoadedData={handleVideoReady}
          className="rounded-lg w-full border"
        />

        <p className="mt-4 font-semibold">{name}</p>

        <button
          onClick={onClose}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Cerrar
        </button>

      </div>
    </div>
  );
};

export default CamaraModal;
