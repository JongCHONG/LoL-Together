import Select from "react-select";

import { Field, Form, Formik } from "formik";
import ModalLayout from "../ModalLayout/ModalLayout";
import ModalStyles from "./Modal.module.scss";

import { Languages } from "../../utils/enums/languages";
import { useUser } from "../../contexts/UserContext";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = ({ open, setOpen }: ModalProps) => {
  const { user } = useUser();

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <h3 className={ModalStyles.modal_title}>Modifier les informations</h3>
      <p>Contenu de ton modal animé.</p>

      <Formik
        initialValues={{
          langues: user?.languages || [], // Valeurs initiales depuis l'utilisateur
          disponibilite: {
            lundi: false,
            mardi: false,
            mercredi: false,
            jeudi: false,
            vendredi: false,
            samedi: false,
            dimanche: false,
          },
          discord: "",
          roles: [],
        }}
        onSubmit={(values) => {
          console.log(values);
          setOpen(false);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className={ModalStyles.form_group}>
              <label>Langues</label>
              <Select
                isMulti
                name="langues"
                options={Object.values(Languages).map((language) => ({
                  value: language,
                  label: language,
                }))}
                value={values.langues.map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
                onChange={(selectedOptions) => {
                  try {
                    const selectedValues = Array.isArray(selectedOptions)
                      ? selectedOptions.map((option) => option.value)
                      : [];
                    setFieldValue("langues", selectedValues);
                  } catch (error) {
                    console.error(
                      "Erreur lors de la sélection des langues:",
                      error
                    );
                    setFieldValue("langues", []);
                  }
                }}
                placeholder="Sélectionnez vos langues..."
                noOptionsMessage={() => "Aucune langue trouvée"}
              />
            </div>

            <div className={ModalStyles.form_group}>
              <label>Disponibilité</label>
              <div className={ModalStyles.checkbox_group}>
                {Object.keys(values.disponibilite).map((jour) => (
                  <label key={jour}>
                    <Field
                      type="checkbox"
                      name={`disponibilite.${jour}`}
                      checked={
                        values.disponibilite[
                          jour as keyof typeof values.disponibilite
                        ]
                      }
                    />
                    {jour.charAt(0).toUpperCase() + jour.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className={ModalStyles.form_group}>
              <label>Discord</label>
              <Field name="discord" type="text" placeholder="username#1234" />
            </div>

            <div className={ModalStyles.form_group}>
              <label>Rôles</label>
              <Field name="roles" type="text" placeholder="ADC, Support..." />
            </div>

            <div className={ModalStyles.form_actions}>
              <button type="button" onClick={() => setOpen(false)}>
                Annuler
              </button>
              <button type="submit">Sauvegarder</button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default Modal;
