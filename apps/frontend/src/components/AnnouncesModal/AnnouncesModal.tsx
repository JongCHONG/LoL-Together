import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";

import AnnounceModalStyles from "./AnnouncesModal.module.scss";
import { createAnnounce, updateAnnounce } from "../../utils/api/announces";
import { Announce, User } from "../../utils/types/api";
import { useUser } from "../../contexts/UserContext";

interface AnnounceModalProps {
  userId: User["_id"];
  open: boolean;
  setOpen: (open: boolean) => void;
  editAnnounce: Announce | null;
}

interface FormValues {
  announce: string;
}

const AnnounceModal = ({
  open,
  setOpen,
  userId,
  editAnnounce,
}: AnnounceModalProps) => {
  const { refreshUser } = useUser();

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void },
    setOpen: (open: boolean) => void
  ) => {
    const data = {
      text: values.announce,
      user: userId,
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
