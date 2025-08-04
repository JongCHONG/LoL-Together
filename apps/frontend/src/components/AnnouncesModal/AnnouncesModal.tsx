import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";

import AnnounceModalStyles from "./AnnouncesModal.module.scss";
import { createAnnounce, updateAnnounce } from "../../utils/api/announces";
import { Announce, Team, User } from "../../utils/types/api";
import { useUser } from "../../contexts/UserContext";
import { ModalProps } from "../../utils/types/modal";

interface AnnounceModalProps extends ModalProps {
  id: User["_id"] | Team["_id"];
  editAnnounce: Announce | null;
}

interface FormValues {
  announce: string;
}

const AnnounceModal = ({
  open,
  setOpen,
  id,
  editAnnounce,
}: AnnounceModalProps) => {
  const { refreshUser } = useUser();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void },
    setOpen: (open: boolean) => void
  ) => {
    if (!id) {
      console.error("User or Team ID is undefined. Cannot create announce.");
      return;
    }
    const data = {
      text: values.announce,
      user: id as string,
    };
    if (editAnnounce) {
      await updateAnnounce(editAnnounce._id, { text: values.announce });
      await refreshUser();
      resetForm();
      setOpen(false);
      return;
    }
    await createAnnounce(data);
    await refreshUser();
    resetForm();
    setOpen(false);
  };

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
