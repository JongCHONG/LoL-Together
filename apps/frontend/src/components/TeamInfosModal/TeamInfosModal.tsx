import { useCallback } from "react";
import { Formik, Form, Field } from "formik";
import { useParams } from "react-router-dom";

import ModalLayout from "../ModalLayout/ModalLayout";
import TeamInfosModalStyles from "./TeamInfosModal.module.scss";
import CustomSelect from "../CustomSelect/CustomSelect";

import { WeekDays } from "../../utils/enums/weekDays";
import { Availabilities, Team } from "../../utils/types/api";
import { statuses } from "../../utils/enums/statuses";
import { ModalProps } from "../../utils/types/modal";
import { updateTeam } from "../../utils/api/team";

interface ModalFormValues {
  languages: string[];
  availabilities: Availabilities;
  region: string[];
  status: string;
  discord: string;
  website: string;
}

interface TeamInfosModalProps extends ModalProps {
  languages: string[];
  availabilities: Availabilities;
  region?: string[];
  status?: string;
  discord?: string;
  website?: string;
  setTeamProfile?: (team: any) => void;
}

const TeamInfosModal = ({
  open,
  setOpen,
  languages,
  availabilities,
  region,
  status,
  discord,
  website,
  setTeamProfile,
}: TeamInfosModalProps) => {
  const { id } = useParams<{ id: string }>();

  const handleSubmit = useCallback(
    async (values: ModalFormValues) => {
      try {
        if (!id) {
          console.error("Team ID is undefined. Cannot update team.");
          return;
        }
        await updateTeam(id, {
          languages: values.languages,
          availabilities: values.availabilities,
          region: values.region,
          status: values.status,
          discord: values.discord,
          website: values.website,
        });
        if (setTeamProfile) {
          setTeamProfile((prevTeam: any) => ({
            ...prevTeam,
            languages: values.languages,
            availabilities: values.availabilities,
            region: values.region,
            status: values.status,
            discord: values.discord,
            website: values.website,
          }));
        }
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
              ? region
              : region
                ? [region]
                : ["EUW"],
            status: status || "Disponible",
            discord: discord || "",
            website: website || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={TeamInfosModalStyles.form_group}>
              <CustomSelect
                values={{
                  languages: values.languages,
                }}
                setFieldValue={setFieldValue}
                type="languages"
              />
              <div className={TeamInfosModalStyles.checkbox_group}>
                <label className={TeamInfosModalStyles.label_title}>
                  Disponibilités :
                </label>
                <div>
                  {Object.entries(WeekDays).map(([dayKey, label]) => (
                    <label
                      key={dayKey}
                      className={TeamInfosModalStyles.checkbox}
                    >
                      <Field
                        style={{
                          marginRight: "5px",
                        }}
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
              <CustomSelect
                values={{ region: values.region }}
                setFieldValue={setFieldValue}
                type="regions"
              />
              <div className={TeamInfosModalStyles.statuses_group}>
                <label
                  className={TeamInfosModalStyles.label_title}
                  style={{ marginRight: "54px" }}
                >
                  Status :
                </label>
                <Field
                  as="select"
                  name="status"
                  className={TeamInfosModalStyles.statuses_field}
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Field>
              </div>
              <div className={TeamInfosModalStyles.input_group}>
                <label
                  className={TeamInfosModalStyles.label_title}
                  style={{ marginRight: "47px" }}
                >
                  Discord :
                </label>
                <Field
                  type="text"
                  name="discord"
                  placeholder="username#1234"
                  className={TeamInfosModalStyles.form_field}
                />
              </div>
              <div className={TeamInfosModalStyles.input_group}>
                <label
                  className={TeamInfosModalStyles.label_title}
                  style={{ marginRight: "41px" }}
                >
                  Site web :
                </label>
                <Field
                  type="url"
                  name="website"
                  placeholder="https://..."
                  className={TeamInfosModalStyles.form_field}
                />
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
