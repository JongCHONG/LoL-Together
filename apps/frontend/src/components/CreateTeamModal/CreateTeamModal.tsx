import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";
import { ModalProps } from "../../utils/types/modal";

import CreateTeamModalStyles from "./CreateTeamModal.module.scss";
import LanguagesSelect from "../LanguagesSelect/LanguagesSelect";

const initialValues = {
  name: "Team",
  description: "",
  website: "",
  discord: "",
  languages: [],
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
        {({ values, setFieldValue }) => (
          <Form className={CreateTeamModalStyles.form_group}>
            <div>
              <label
                htmlFor="name"
                className={CreateTeamModalStyles.form_title}
              >
                Nom de l'équipe :{" "}
              </label>
              <Field type="text" id="name" name="name" required />
            </div>
            <LanguagesSelect
                values={values}
                setFieldValue={setFieldValue}
            />
            <div>
              <label
                htmlFor="website"
                className={CreateTeamModalStyles.form_title}
              >
                Site web :{" "}
              </label>
              <Field
                className={CreateTeamModalStyles.form_field}
                type="url"
                id="website"
                name="website"
                placeholder="https://..."
              />
            </div>
            <div>
              <label
                htmlFor="discord"
                className={CreateTeamModalStyles.form_title}
              >
                Discord :{" "}
              </label>
              <Field
                className={CreateTeamModalStyles.form_field}
                type="text"
                id="discord"
                name="discord"
                placeholder="Lien ou tag Discord"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className={CreateTeamModalStyles.form_title}
              >
                Description :{" "}
              </label>
              <br />
              <Field
                className={CreateTeamModalStyles.form_field}
                as="textarea"
                id="description"
                name="description"
              />
            </div>
            <button type="submit">Créer l'équipe</button>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default CreateTeamModal;
