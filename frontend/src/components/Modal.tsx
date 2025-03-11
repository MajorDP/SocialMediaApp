interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: IModal) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="bg-black opacity-30 absolute inset-0 z-0"
        onClick={onClose}
      ></div>
      <div className="p-6 rounded-2xl shadow-lg w-96 z-10">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
