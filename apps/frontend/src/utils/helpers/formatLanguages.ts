export const formatLanguages = (languages: string[]) => {
  return languages && languages.length > 0
    ? languages.join(", ")
    : "N/A";
};
