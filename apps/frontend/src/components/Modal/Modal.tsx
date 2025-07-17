import Select from "react-select";

import { Field, Form, Formik } from "formik";
import ModalLayout from "../ModalLayout/ModalLayout";
import ModalStyles from "./Modal.module.scss";

import { Languages } from "../../utils/enums/languages";
import { WeekDays } from "../../utils/enums/weekDays";
import { LolRole } from "../../utils/enums/lolRole";
import { useUser } from "../../contexts/UserContext";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ModalFormValues {
  langues: string[];
  availabilities: Record<string, boolean>;
  discord: string;
  roles: Record<string, boolean>;
}

const Modal = ({ open, setOpen }: ModalProps) => {
  const { user } = useUser();


  interface HandleSubmitProps {
    setOpen: (open: boolean) => void;
  }

  const handleSubmit = (
    values: ModalFormValues,
    { setOpen }: HandleSubmitProps
  ) => {
    setOpen(false);


  };

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={ModalStyles.container}>
        <h3 className={ModalStyles.modal_title}>Modifier les informations</h3>
        <p>Contenu de ton modal animé.</p>

        <Formik
          initialValues={{
            langues: user?.languages || [],
            availabilities: {
              [WeekDays.monday]: false,
              [WeekDays.tuesday]: false,
              [WeekDays.wednesday]: false,
              [WeekDays.thursday]: false,
              [WeekDays.friday]: false,
              [WeekDays.saturday]: false,
              [WeekDays.sunday]: false,
            },
            discord: user?.discord || "N/A",
            roles: {
              [LolRole.TOP]: false,
              [LolRole.JUNGLE]: false,
              [LolRole.MID]: false,
              [LolRole.ADC]: false,
              [LolRole.SUPPORT]: false,
            },
          }}
          onSubmit={(values) => {
            console.log(values);
            setOpen(false);
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className={ModalStyles.form_group}>
                <div
                  className={ModalStyles.form_title}
                  style={{ marginRight: "32px" }}
                >
                  Langues :{" "}
                </div>
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
                <div className={ModalStyles.form_title}>Disponibilités : </div>
                <div className={ModalStyles.checkbox_group}>
                  {Object.keys(values.availabilities).map((jour) => (
                    <div key={jour}>
                      <Field
                        className={ModalStyles.checkbox}
                        type="checkbox"
                        name={`availabilities.${jour}`}
                        checked={
                          values.availabilities[
                            jour as unknown as keyof typeof values.availabilities
                          ]
                        }
                      />
                      {jour.charAt(0).toUpperCase() + jour.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              <div className={ModalStyles.form_group}>
                <div
                  className={ModalStyles.form_title}
                  style={{ marginRight: "38px" }}
                >
                  Discord :
                </div>

                <Field
                  name="discord"
                  type="text"
                  placeholder="username#1234"
                  className={ModalStyles.form_field}
                />
              </div>

              <div className={ModalStyles.form_group}>
                <div
                  className={ModalStyles.form_title}
                  style={{ marginRight: "52px" }}
                >
                  Rôles :
                </div>

                <div className={ModalStyles.checkbox_group}>
                  {Object.values(LolRole).map((role) => (
                    <div key={role}>
                      <Field
                        className={ModalStyles.checkbox}
                        type="checkbox"
                        name={`roles.${role}`}
                        checked={
                          values.roles[role as keyof typeof values.roles]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(`roles.${role}`, e.target.checked);
                        }}
                      />
                      {role}
                    </div>
                  ))}
                </div>
              </div>

              <div className={ModalStyles.form_actions}>
                <button type="submit" className={ModalStyles.save_button}>
                  Sauvegarder
                </button>
                <button
                  type="button"
                  className={ModalStyles.cancel_button}
                  onClick={() => handleSubmit()}
                >
                  Annuler
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
};

export default Modal;
