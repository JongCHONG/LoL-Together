import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import RegisterStyles from "./Register.module.scss";
import { registerUser } from "../../utils/api/auth";
import { RegisterCredentials } from "../../utils/types/auth";
import { registerValidationSchema } from "../../utils/validations/auth";
import Menu from "../../components/Menu/Menu";

interface FormValues extends RegisterCredentials {
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      setSignupError("");

      const credentials = {
        email: values.email,
        password: values.password,
        riot_id: values.riot_id,
        tagline: values.tagline,
      };

      const data = await registerUser(credentials);

      console.log("Inscription réussie:", data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setSignupError(
        error instanceof Error
          ? error.message
          : "Erreur de connexion au serveur"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Menu />
      <div className={RegisterStyles.container}>
        <h1 className={RegisterStyles.title}>Inscription</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            riot_id: "",
            tagline: "",
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={RegisterStyles.form}>
              {signupError && (
                <div
                  className={RegisterStyles.error}
                  style={{ marginBottom: "1rem" }}
                >
                  {signupError}
                </div>
              )}

              <div className={RegisterStyles.field}>
                <label htmlFor="email" className={RegisterStyles.label}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={RegisterStyles.input}
                  placeholder="Entrez votre email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={RegisterStyles.error}
                />
              </div>

              <div className={RegisterStyles.field}>
                <label htmlFor="password" className={RegisterStyles.label}>
                  Mot de passe
                </label>
                <Field
                  type="password"
                  name="password"
                  className={RegisterStyles.input}
                  placeholder="Entrez votre mot de passe"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={RegisterStyles.error}
                />
              </div>

              <div className={RegisterStyles.field}>
                <label
                  htmlFor="confirmPassword"
                  className={RegisterStyles.label}
                >
                  Confirmer le mot de passe
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={RegisterStyles.input}
                  placeholder="Confirmez votre mot de passe"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={RegisterStyles.error}
                />
              </div>

              <div className={RegisterStyles.field}>
                <label htmlFor="riot_id" className={RegisterStyles.label}>
                  Riot ID
                </label>
                <Field
                  type="text"
                  name="riot_id"
                  className={RegisterStyles.input}
                  placeholder="Ex: Senceless"
                />
                <ErrorMessage
                  name="riot_id"
                  component="div"
                  className={RegisterStyles.error}
                />
              </div>

              <div className={RegisterStyles.field}>
                <label htmlFor="tagline" className={RegisterStyles.label}>
                  Tagline
                </label>
                <Field
                  type="text"
                  name="tagline"
                  className={RegisterStyles.input}
                  placeholder="Ex: 069"
                />
                <ErrorMessage
                  name="tagline"
                  component="div"
                  className={RegisterStyles.error}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={RegisterStyles.button}
              >
                {isSubmitting ? "Inscription..." : "S'inscrire"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
