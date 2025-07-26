import { Formik, Form, Field } from "formik";

import ModalLayout from "../ModalLayout/ModalLayout";
import { ModalProps } from "../../utils/types/modal";

import CreateTeamModalStyles from "./CreateTeamModal.module.scss";
import LanguagesSelect from "../LanguagesSelect/LanguagesSelect";
import { useUser } from "../../contexts/UserContext";
import { createTeam } from "../../utils/api/team";

const initialValues = {
  name: "Team",
  description: "Test",
  website: "http://website.com",
  discord: "Test",
  languages: [],
};

const CreateTeamModal = ({ open, setOpen }: ModalProps) => {
  const { currentUser, refreshUser } = useUser();

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <h3 className={CreateTeamModalStyles.modal_title}>Créer une équipe</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          const teamData = {
            ...values,
            leader: {
              _id: currentUser?._id || "",
              riot_id: currentUser?.riot_id || "",
            },
          };
          
          createTeam(teamData).then(() => {
            refreshUser();
            resetForm();
            setOpen(false);
          });
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={CreateTeamModalStyles.form_group}>
            <div>
              <label
                htmlFor="name"
                className={CreateTeamModalStyles.form_title}
              >
                Nom :
              </label>
              <Field
                className={CreateTeamModalStyles.form_field}
                style={{ marginLeft: "67px" }}
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <LanguagesSelect values={values} setFieldValue={setFieldValue} />
            <div>
              <label
                htmlFor="website"
                className={CreateTeamModalStyles.form_title}
              >
                Site web :
              </label>
              <Field
                className={CreateTeamModalStyles.form_field}
                style={{ marginLeft: "43px" }}
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
                style={{ marginLeft: "45px" }}
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
