"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import LoginStyles from "./login.module.scss";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

const page = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError("");

      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        localStorage.setItem("authToken", token);

        console.log("Connexion réussie, token:", token);

        router.push("/");
      } else {
        setLoginError(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setLoginError("Erreur de connexion au serveur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={LoginStyles.container}>
      <h1 className={LoginStyles.title}>Connexion</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
