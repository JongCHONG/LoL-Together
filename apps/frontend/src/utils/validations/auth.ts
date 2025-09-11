import * as Yup from "yup";

// Validation pour la connexion
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

// Validation pour l'inscription
export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("La confirmation du mot de passe est requise"),
  riot_id: Yup.string()
    .min(3, "Le Riot ID doit contenir au moins 3 caractères")
    .max(16, "Le Riot ID ne peut pas dépasser 16 caractères"),
  tagline: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{3,5}$/,
      "Le tagline doit contenir 3 à 5 caractères alphanumériques"
    )
});