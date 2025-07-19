import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";

import AnnounceModalStyles from "./AnnouncesModal.module.scss";
import { createAnnounce } from "../../utils/api/announces";
import { User } from "../../utils/types/api";
import { useUser } from "../../contexts/UserContext";

interface AnnounceModalProps {
  userId: User["_id"];
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface FormValues {
  announce: string;
}

const AnnounceModal = ({ open, setOpen, userId }: AnnounceModalProps) => {
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
    await createAnnounce(data);
    await refreshUser();
    resetForm();
    setOpen(false);
  };
  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={AnnounceModalStyles.container}>
        <h3 className={AnnounceModalStyles.modal_title}>Faire une annonce</h3>

        <Formik
          initialValues={{ announce: "" }}
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
