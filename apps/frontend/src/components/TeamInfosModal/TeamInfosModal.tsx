import { Formik, Form, Field } from "formik";
import { ModalProps } from "../../utils/types/modal";
import ModalLayout from "../ModalLayout/ModalLayout";
import TeamInfosModalStyles from "./TeamInfosModal.module.scss";
import { useCallback } from "react";
import LanguagesSelect from "../LanguagesSelect/LanguagesSelect";
import { WeekDays } from "../../utils/enums/weekDays";
import { Availabilities } from "../../utils/types/api";

interface ModalFormValues {
  languages: string[];
  availabilities: Availabilities;
  region: string;
  status: string;
  discord: string;
  website: string;
}

const regions = [
  "EUW",
  "EUNE",
  "NA",
  "KR",
  "LAN",
  "LAS",
  "OCE",
  "RU",
  "TR",
  "JP",
];

interface TeamInfosModalProps extends ModalProps {
  languages: string[];
  availabilities: Availabilities;
  region?: string[];
  status?: string;
  discord?: string;
  website?: string;
}

const statuses = [
  "Disponible",
  "Occupé",
  "En partie",
  "Absent",
  "En recherche d'équipe",
];

const TeamInfosModal = ({
  open,
  setOpen,
  languages,
  availabilities,
  region,
  status,
  discord,
  website,
}: TeamInfosModalProps) => {
  const handleSubmit = useCallback(
    async (values: ModalFormValues) => {
      try {
        // Appelle ici ton API pour update l'utilisateur
        // await updateUser(user._id, values);
        setOpen(false);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    [setOpen]
  );

  return (
    <ModalLayout open={open} onClose={() => setOpen(false)}>
      <div className={TeamInfosModalStyles.container}>
        <h3 className={TeamInfosModalStyles.modal_title}>
          Modifier les informations
        </h3>
        <Formik
          initialValues={{
            languages: languages || [],
            availabilities: availabilities || {
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              friday: false,
              saturday: false,
              sunday: false,
            },
            region: Array.isArray(region)
              ? region[0] || "EUW"
              : region || "EUW",
            status: status || "Disponible",
            discord: discord || "",
            website: website || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={TeamInfosModalStyles.formGroup}>
              <div>
                <label>Langues :</label>
                <LanguagesSelect
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div>
                <label>Disponibilités :</label>
                <div className={TeamInfosModalStyles.checkbox_group}>
                  {Object.entries(WeekDays).map(([dayKey, label]) => (
                    <label key={dayKey}>
                      <Field
                        type="checkbox"
                        name={`availabilities.${dayKey}`}
                        checked={
                          values.availabilities[dayKey as keyof Availabilities]
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFieldValue(
                            `availabilities.${dayKey}`,
                            e.target.checked
                          )
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Région :</label>
                <Field as="select" name="region">
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label>Status :</label>
                <Field as="select" name="status">
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label>Discord :</label>
                <Field type="text" name="discord" placeholder="username#1234" />
              </div>
              <div>
                <label>Site web :</label>
                <Field type="url" name="website" placeholder="https://..." />
              </div>
              <div className={TeamInfosModalStyles.form_actions}>
                <button
                  type="submit"
                  className={TeamInfosModalStyles.save_button}
                >
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

export default TeamInfosModal;
