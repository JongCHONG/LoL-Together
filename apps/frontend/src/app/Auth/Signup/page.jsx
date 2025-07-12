"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import SignupStyles from "./signup.module.scss";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Format d'email invalide")
    .required("L'email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
  riot_id: Yup.string()
    .min(3, "Le Riot ID doit contenir au moins 3 caractères")
    .max(16, "Le Riot ID ne peut pas dépasser 16 caractères")
    .required("Le Riot ID est requis"),
  tagline: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{3,5}$/,
      "Le tagline doit contenir 3 à 5 caractères alphanumériques"
    )
    .required("Le tagline est requis"),
});

const page = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSignupError("");

      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          riot_id: values.riot_id,
          tagline: values.tagline,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Inscription réussie:", data);
        router.push("/auth/login");
      } else {
        setSignupError(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setSignupError("Erreur de connexion au serveur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={SignupStyles.container}>
      <h1 className={SignupStyles.title}>Inscription</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
          riot_id: "",
          tagline: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={SignupStyles.form}>
            {signupError && (
              <div
                className={SignupStyles.error}
                style={{ marginBottom: "1rem" }}
              >
                {signupError}
              </div>
            )}

            <div className={SignupStyles.field}>
              <label htmlFor="email" className={SignupStyles.label}>
                Email
              </label>
              <Field
                type="email"
                name="email"
                className={SignupStyles.input}
                placeholder="Entrez votre email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={SignupStyles.error}
              />
            </div>

            <div className={SignupStyles.field}>
              <label htmlFor="password" className={SignupStyles.label}>
                Mot de passe
              </label>
              <Field
                type="password"
                name="password"
                className={SignupStyles.input}
                placeholder="Entrez votre mot de passe"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={SignupStyles.error}
              />
            </div>

            <div className={SignupStyles.field}>
              <label htmlFor="riot_id" className={SignupStyles.label}>
                Riot ID
              </label>
              <Field
                type="text"
                name="riot_id"
                className={SignupStyles.input}
                placeholder="Ex: Senceless"
              />
              <ErrorMessage
                name="riot_id"
                component="div"
                className={SignupStyles.error}
              />
            </div>

            <div className={SignupStyles.field}>
              <label htmlFor="tagline" className={SignupStyles.label}>
                Tagline
              </label>
              <Field
                type="text"
                name="tagline"
                className={SignupStyles.input}
                placeholder="Ex: 069"
              />
              <ErrorMessage
                name="tagline"
                component="div"
                className={SignupStyles.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={SignupStyles.button}
            >
              {isSubmitting ? "Inscription..." : "S'inscrire"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default page;
