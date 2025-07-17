import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalLayoutStyles from "./ModalLayout.module.scss";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalLayout = ({ open, onClose, children }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        className={ModalLayoutStyles.modal_backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={ModalLayoutStyles.modal_content}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className={ModalLayoutStyles.modal_close}
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ModalLayout;
