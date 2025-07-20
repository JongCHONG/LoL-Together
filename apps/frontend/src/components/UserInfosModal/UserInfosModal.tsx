
import { Field, Form, Formik } from "formik";
import ModalLayout from "../ModalLayout/ModalLayout";
import ModalStyles from "./UserInfosModal.module.scss";

import { WeekDays } from "../../utils/enums/weekDays";
import { LolRole } from "../../utils/enums/lolRole";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../utils/api/user";
import { Availabilities } from "../../utils/types/api";
import { roles } from "../../utils/types/api";
import { ModalProps } from "../../utils/types/modal";
import LanguagesSelect from "../LanguagesSelect/LanguagesSelect";

interface ModalFormValues {
  languages: string[];
  availabilities: Availabilities;
  discord: string;
  roles: roles;
}

interface HandleSubmitProps {
  setOpen: (open: boolean) => void;
}

const UserInfosModal = ({ open, setOpen }: ModalProps) => {
  const { currentUser, refreshUser } = useUser();

  const handleSubmit = async (
    values: ModalFormValues,
    { setOpen }: HandleSubmitProps
  ) => {
    try {
      if (!currentUser?._id) {
        console.error("User ID is undefined. Cannot update currentUser.");
        return;
      }
      await updateUser(currentUser._id, {
        languages: values.languages,
        availabilities: values.availabilities,
        discord: values.discord,
        roles: values.roles,
      });
      await refreshUser();
      setOpen(false);
    } catch (error) {
      console.error("Error updating currentUser:", error);
    }
  };

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={ModalStyles.container}>
        <h3 className={ModalStyles.modal_title}>Modifier les informations</h3>
        <p>Contenu de ton modal animé.</p>

        <Formik
          initialValues={{
            languages: currentUser?.languages || [],
            availabilities: currentUser?.availabilities || {
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
            },
            discord: currentUser?.discord || "N/A",
            roles: currentUser?.roles || {
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
              <LanguagesSelect
                values={values}
                setFieldValue={setFieldValue}
              />

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
