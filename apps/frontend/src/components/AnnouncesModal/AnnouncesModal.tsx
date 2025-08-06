import { useCallback } from "react";
import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";

import AnnounceModalStyles from "./AnnouncesModal.module.scss";

import { ModalProps } from "../../utils/types/modal";
import { createAnnounce, updateAnnounce } from "../../utils/api/announces";
import { Announce, Team, User } from "../../utils/types/api";
import { useUser } from "../../contexts/UserContext";

interface AnnounceModalProps extends ModalProps {
  userId?: User["_id"];
  teamId?: Team["_id"];
  editAnnounce: Announce | null;
  onAnnounceChange: (announce: Announce, mode: "create" | "edit") => void;
}

interface FormValues {
  announce: string;
}

const AnnounceModal = ({
  open,
  setOpen,
  userId,
  teamId,
  editAnnounce,
  onAnnounceChange,
}: AnnounceModalProps) => {
  const { refreshUser } = useUser();

  const handleSubmit = useCallback(
    async (
      values: FormValues,
      { resetForm }: { resetForm: () => void },
      setOpen: (open: boolean) => void
    ) => {
      if (!userId && !teamId) {
        console.error(
          "User ID and Team ID are both undefined. Cannot create announce."
        );
        return;
      }
      const data = {
        text: values.announce,
        user: userId as string,
        team: teamId as string,
      };
      if (editAnnounce) {
        const updated = await updateAnnounce(editAnnounce._id, {
          text: values.announce,
        });
        await refreshUser();
        resetForm();
        setOpen(false);
        onAnnounceChange(updated, "edit");
        return;
      }
      const newAnnounce = await createAnnounce(data);
      await refreshUser();
      resetForm();
      setOpen(false);
      onAnnounceChange(newAnnounce, "create");
    },
    [userId, teamId, editAnnounce, refreshUser, onAnnounceChange]
  );

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={AnnounceModalStyles.container}>
        <h3 className={AnnounceModalStyles.modal_title}>
          {editAnnounce ? "Modifier une annonce" : "Faire une annonce"}
        </h3>

        <Formik
          initialValues={{ announce: editAnnounce?.text || "" }}
          onSubmit={(values, actions) => handleSubmit(values, actions, setOpen)}
        >
          {() => (
            <Form className={AnnounceModalStyles.form}>
              <Field
                as="textarea"
                name="announce"
                className={AnnounceModalStyles.textarea}
                placeholder="Votre annonce..."
                rows={5}
              />
              <button
                type="submit"
                className={AnnounceModalStyles.submit_button}
              >
                Publier
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
};

export default AnnounceModal;
