import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";
import { ModalProps } from "../../utils/types/modal";

import CreateTeamModalStyles from "./CreateTeamModal.module.scss";

const initialValues = {
  teamName: "",
  gameMode: "ranked",
  description: "",
};

const CreateTeamModal = ({ open, setOpen }: ModalProps) => {
  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <h3 className={CreateTeamModalStyles.modal_title}>Créer une équipe</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          // Ici tu peux envoyer les données à ton API
          console.log(values);
          resetForm();
          setOpen(false);
        }}
      >
        {() => (
          <Form className={CreateTeamModalStyles.formGroup}>
            <div>
              <label htmlFor="teamName">Nom de l'équipe</label>
              <Field type="text" id="teamName" name="teamName" required />
            </div>
            <div>
              <label htmlFor="gameMode">Mode de jeu</label>
              <Field as="select" id="gameMode" name="gameMode" required>
                <option value="ranked">Classé</option>
                <option value="normal">Normal</option>
              </Field>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" />
            </div>
            <button type="submit">Créer l'équipe</button>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default CreateTeamModal;
