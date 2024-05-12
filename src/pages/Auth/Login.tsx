import useAuth from "@/auth/useAuth";
import LoginValidationSchema from "@/schemas/form/LoginFormSchema";
import { login } from "@/services/authService";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { logInOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Login() {
  const { authenticate } = useAuth();
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const [error, setError] = useState("");

  return (
    <IonContent className="p-6">
      <h1 className="text-3xl text-center mt-24 mb-16">Welcome Back</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={toFormikValidationSchema(LoginValidationSchema)}
        onSubmit={async (values) => {
          setError("");

          await login(values.email, values.password)
            .then(async (response) => {
              // Save the user and token to the context/storage
              authenticate(response.data.token, response.data.user)
                .then(() => {
                  // Redirect to the dashboard or the redirect URL if they were redirected to the login page
                  const redirectUrl = searchParams.get("redirectUrl");

                  history.push(redirectUrl || "/dashboard");
                })
                .catch((error) => {
                  setError(error.message);
                });
            })
            .catch((error) => {
              setError(error.message);
            });
        }}
        validateOnBlur
      >
        {({
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="p-6">
            <IonInput
              type="email"
              placeholder="john.doe.example.com"
              label="Email"
              labelPlacement="stacked"
              autoFocus
              inputMode="email"
              autocomplete="email"
              onIonInput={(e) => setFieldValue("email", e.detail.value)}
              onIonBlur={handleBlur}
              value={values.email}
              errorText={errors.email}
              fill="outline"
              className={errors.email ? "ion-invalid" : ""}
            />
            <IonInput
              type="password"
              label="Password"
              labelPlacement="stacked"
              autocomplete="current-password"
              onIonInput={(e) => setFieldValue("password", e.detail.value)}
              onIonBlur={handleBlur}
              value={values.password}
              errorText={errors.password}
              fill="outline"
              className={`${errors.password ? "ion-invalid" : ""} mt-6`}
            />

            <IonButton type="submit" className="mt-8" disabled={isSubmitting}>
              Log in
              {isSubmitting ? (
                <IonSpinner slot="end" name="dots"></IonSpinner>
              ) : (
                <IonIcon slot="end" icon={logInOutline} />
              )}
            </IonButton>
            {error && !isSubmitting ? (
              <IonToast
                isOpen
                message={error}
                onDidDismiss={() => setError("")}
                buttons={[
                  {
                    text: "Dismiss",
                    role: "cancel",
                  },
                ]}
              ></IonToast>
            ) : null}
          </form>
        )}
      </Formik>
    </IonContent>
  );
}
