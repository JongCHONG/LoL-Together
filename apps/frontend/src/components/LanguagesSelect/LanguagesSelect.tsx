import Select from "react-select";

import LanguagesSelectStyles from "./LanguagesSelect.module.scss";
import { Languages } from "../../utils/enums/languages";

interface LanguagesSelectProps {
  values: { languages: string[] };
  setFieldValue: (field: string, value: any) => void;
}

const LanguagesSelect = ({ values, setFieldValue }: LanguagesSelectProps) => {
  return (
    <div className={LanguagesSelectStyles.form_group}>
      <div className={LanguagesSelectStyles.form_title} style={{ marginRight: "32px" }}>
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
            console.error("Erreur lors de la sélection des langues:", error);
            setFieldValue("langues", []);
          }
        }}
        placeholder="Sélectionnez vos langues..."
        noOptionsMessage={() => "Aucune langue trouvée"}
      />
    </div>
  );
};

export default LanguagesSelect;
