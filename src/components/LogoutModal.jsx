import { motion, AnimatePresence } from "framer-motion";

const LogoutModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Sfondo blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Modale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-blue-50 rounded-2xl shadow-xl p-6 max-w-xs w-full text-center space-y-4 z-50"
          >
            <h2 className="text-lg font-semibold text-gray-800">Logout effettuato</h2>
            <p className="text-sm text-gray-600">Sei uscito correttamente dall'account.</p>
            <button
              onClick={onClose}
              className="mt-4 px-10 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition"
            >
              Ok
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
