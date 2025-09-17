import ConfirmModalStyles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  onDeleteAccount?: () => Promise<void> | void;
  onDeleteTeam?: () => Promise<void> | void;
  onClose: (confirmed: boolean) => void;
}

const ConfirmModal = ({
  onDeleteAccount,
  onClose,
  onDeleteTeam,
}: ConfirmModalProps) => {
  return (
    <div className={ConfirmModalStyles.confirmModalOverlay}>
      <div className={ConfirmModalStyles.confirmModal}>
        <h3>Confirmation</h3>
        <br />
        <p>
          Es-tu sûr de vouloir supprimer ton{" "}
          {onDeleteTeam ? "équipe" : "compte"} ? Cette action est irréversible.
        </p>
        <div className={ConfirmModalStyles.confirmModalButtons}>
          <button
            className={ConfirmModalStyles.cancelButton}
            onClick={() => onClose(false)}
          >
            Annuler
          </button>
          <button
            className={ConfirmModalStyles.confirmButton}
            onClick={async () => {
              if (onDeleteAccount) {
                await onDeleteAccount();
              }
              if (onDeleteTeam) {
                await onDeleteTeam();
              }
            }}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
