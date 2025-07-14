import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { Formik, Form, Field, ErrorMessage } from "formik";

import LoginStyles from "./login.module.scss";

import Menu from "../../components/Menu/Menu";

import { loginUser } from "../../utils/api/auth";
import { LoginCredentials } from "../../utils/types/auth";
import { loginValidationSchema } from "../../utils/validations/auth";
import { fetchUserById } from "../../utils/api/user";

import { useUser } from "../../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (
    values: LoginCredentials,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setLoginError("");

      const data = await loginUser(values);

      localStorage.setItem("authToken", data.token);
      const decodedToken = decodeToken(data.token) as { userId: string };

      const user = await fetchUserById(decodedToken.userId);
      setUser(user);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setLoginError(
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
      <div className={LoginStyles.container}>
        <h1 className={LoginStyles.title}>Connexion</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={LoginStyles.form}>
              <div className={LoginStyles.field}>
                <label htmlFor="email" className={LoginStyles.label}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className={LoginStyles.input}
                  placeholder="Entrez votre email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={LoginStyles.error}
                />
              </div>

              <div className={LoginStyles.field}>
                <label htmlFor="password" className={LoginStyles.label}>
                  Mot de passe
                </label>
                <Field
                  type="password"
                  name="password"
                  className={LoginStyles.input}
                  placeholder="Entrez votre mot de passe"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={LoginStyles.error}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={LoginStyles.button}
              >
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>

              {loginError && (
                <div className={LoginStyles.error}>{loginError}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
