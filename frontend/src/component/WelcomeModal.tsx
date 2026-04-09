import UpbLogo from "../assets/upb.png";

interface Props {
  isOpen: boolean;
  name: string;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, name, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#160660] text-white rounded-2xl shadow-xl p-8 text-center w-[90%] max-w-md animate-scaleIn">
        
        <img src={UpbLogo} alt="UPB" className="mx-auto h-16 mb-4" />

        <h2 className="text-2xl font-bold">
          ¡Bienvenido!
        </h2>

        <p className="mt-2 text-lg font-semibold">
          {name}
        </p>

        <button
          onClick={onClose}
          className="mt-6 bg-white text-[#160660] px-6 py-2 rounded-lg hover:bg-[#56c8eb] transition font-bold"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}