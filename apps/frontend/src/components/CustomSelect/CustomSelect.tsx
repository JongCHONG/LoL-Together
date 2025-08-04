import Select from "react-select";

import CustomSelectStyles from "./CustomSelect.module.scss";
import { Languages } from "../../utils/enums/languages";
import { regions } from "../../utils/enums/regions";

interface CustomSelectProps {
  values: { languages?: string[]; region?: string[] };
  setFieldValue: (field: string, value: any) => void;
  type: "languages" | "regions";
}

const CustomSelect = ({ values, setFieldValue, type }: CustomSelectProps) => {
  const isLanguages = type === "languages";
  const options = isLanguages
    ? Object.values(Languages).map((language) => ({
        value: language,
        label: language,
      }))
    : regions.map((region) => ({
        value: region,
        label: region,
      }));

  const value =
    (isLanguages ? values.languages : values.region)?.map((item) => ({
      value: item,
      label: item,
    })) || [];

  return (
    <div className={CustomSelectStyles.form_group}>
      <div
        className={CustomSelectStyles.form_title}
        style={{ marginRight: "32px" }}
      >
        {isLanguages ? "Langues :" : "Régions :"}
      </div>
      <Select
        isMulti
        name={isLanguages ? "languages" : "region"}
        options={options}
        value={value}
        onChange={(selectedOptions) => {
          try {
            const selectedValues = Array.isArray(selectedOptions)
              ? selectedOptions.map((option) => option.value)
              : [];
            setFieldValue(isLanguages ? "languages" : "region", selectedValues);
          } catch (error) {
            console.error(
              `Erreur lors de la sélection des ${isLanguages ? "langues" : "régions"}:`,
              error
            );
            setFieldValue(isLanguages ? "languages" : "region", []);
          }
        }}
        placeholder={
          isLanguages
            ? "Sélectionnez vos langues..."
            : "Sélectionnez vos régions..."
        }
        noOptionsMessage={() =>
          isLanguages ? "Aucune langue trouvée" : "Aucune région trouvée"
        }
      />
    </div>
  );
};

export default CustomSelect;
