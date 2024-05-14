import useAuth from "@/auth/useAuth";
import EstateSchema from "@/schemas/estate/EstateSchema";
import LoginValidationSchema from "@/schemas/form/LoginFormSchema";
import { login } from "@/services/authService";
import { getEstates } from "@/services/estateService";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSpinner,
  IonToast,
} from "@ionic/react";
import { Formik } from "formik";
import { chevronForwardOutline, logInOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function Login() {
  const { authenticate, setEstate } = useAuth();
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search);

  const modal = useRef<HTMLIonModalElement>(null);

  const [error, setError] = useState("");
  const [estates, setEstates] = useState<z.infer<typeof EstateSchema>[]>([]);

  const redirectToDashboard = () => {
    const redirectUrl = searchParams.get("redirectUrl");

    history.push(redirectUrl || "/dashboard");
  };

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

          try {
            const loginResponse = await login(values.email, values.password);
            const { token, user } = loginResponse.data;

            await authenticate(token, user);

            const estatesResponse = await getEstates();

            if (estatesResponse.length === 0) {
              history.push("create-estate");
            }

            if (estatesResponse.length > 1) {
              setEstates(estatesResponse);
              return;
            }

            await setEstate(estatesResponse[0]);

            redirectToDashboard();
          } catch (error: unknown) {
            setError(
              error instanceof Error ? error.message : "An error occurred"
            );
          }
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

      <IonModal
        ref={modal}
        trigger="open-modal"
        initialBreakpoint={0.5}
        breakpoints={[0.25, 0.5, 0.75]}
        isOpen={estates.length > 1}
        canDismiss={false}
      >
        <IonContent className="ion-padding">
          <h1 className="text-2xl text-center mt-2 mb-6">Select an estate</h1>
          <IonList lines="full">
            {estates.map((estate) => (
              <IonItem
                key={estate.id}
                onClick={async () => {
                  await setEstate(estate);

                  redirectToDashboard();
                }}
                className="cursor-pointer"
              >
                {estate.name}
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </IonContent>
  );
}
