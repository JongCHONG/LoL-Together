import Select from "react-select";

import { Field, Form, Formik } from "formik";
import ModalLayout from "../ModalLayout/ModalLayout";
import ModalStyles from "./UserInfosModal.module.scss";

import { Languages } from "../../utils/enums/languages";
import { WeekDays } from "../../utils/enums/weekDays";
import { LolRole } from "../../utils/enums/lolRole";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../utils/api/user";
import { Availabilities } from "../../utils/types/api";
import { roles } from "../../utils/types/api";

interface UserInfosModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ModalFormValues {
  languages: string[];
  availabilities: Availabilities;
  discord: string;
  roles: roles;
}

const UserInfosModal = ({ open, setOpen }: UserInfosModalProps) => {
  const { user, refreshUser } = useUser();

  interface HandleSubmitProps {
    setOpen: (open: boolean) => void;
  }

  const handleSubmit = async (
    values: ModalFormValues,
    { setOpen }: HandleSubmitProps
  ) => {
    try {
      if (!user?._id) {
        console.error("User ID is undefined. Cannot update user.");
        return;
      }
      await updateUser(user._id, {
        languages: values.languages,
        availabilities: values.availabilities,
        discord: values.discord,
        roles: values.roles,
      });
      await refreshUser();
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={ModalStyles.container}>
        <h3 className={ModalStyles.modal_title}>Modifier les informations</h3>
        <p>Contenu de ton modal animé.</p>

        <Formik
          initialValues={{
            languages: user?.languages || [],
            availabilities: user?.availabilities || {
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
            },
            discord: user?.discord || "N/A",
            roles: user?.roles || {
              TOP: false,
              JUNGLE: false,
              MID: false,
              ADC: false,
              SUPPORT: false,
            },
          }}
          onSubmit={(values) => {
            handleSubmit(values, { setOpen });
          }}
        >
          {({ values, handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <div className={ModalStyles.form_group}>
                <div
                  className={ModalStyles.form_title}
                  style={{ marginRight: "32px" }}
                >
                  Langues :
                </div>
                <Select
                  isMulti
                  name="languages"
                  options={Object.values(Languages).map((language) => ({
                    value: language,
                    label: language,
                  }))}
                  value={values.languages.map((lang) => ({
                    value: lang,
                    label: lang,
                  }))}
                  onChange={(selectedOptions) => {
                    try {
                      const selectedValues = Array.isArray(selectedOptions)
                        ? selectedOptions.map((option) => option.value)
                        : [];
                      setFieldValue("languages", selectedValues);
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
                  {Object.entries(WeekDays).map(([dayKey, label]) => (
                    <div key={dayKey}>
                      <Field
                        className={ModalStyles.checkbox}
                        type="checkbox"
                        name={`availabilities.${dayKey}`}
                        checked={
                          values.availabilities[
                            dayKey as keyof typeof values.availabilities
                          ]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(
                            `availabilities.${dayKey}`,
                            e.target.checked
                          );
                        }}
                      />
                      {label}
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
                  {Object.entries(LolRole).map(([dayKey, label]) => (
                    <div key={dayKey}>
                      <Field
                        className={ModalStyles.checkbox}
                        type="checkbox"
                        name={`roles.${dayKey}`}
                        checked={
                          values.roles[dayKey as keyof typeof values.roles]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue(`roles.${dayKey}`, e.target.checked);
                        }}
                      />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <div className={ModalStyles.form_actions}>
                <button type="submit" className={ModalStyles.save_button}>
                  Sauvegarder
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
};

export default UserInfosModal;
