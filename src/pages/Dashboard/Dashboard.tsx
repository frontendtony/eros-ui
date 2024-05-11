import { IonContent, IonPage } from "@ionic/react";
import ComingSoon from "components/ComingSoon";

export default function Home() {
  return (
    <IonPage>
      <IonContent>
        <ComingSoon />
      </IonContent>
    </IonPage>
  );
}
