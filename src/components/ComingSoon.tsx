import { IonIcon } from "@ionic/react";
import { constructOutline } from "ionicons/icons";

export default function ComingSoon() {
  return (
    <div className="flex flex-col space-y-4 justify-center h-full p-6">
      <IonIcon icon={constructOutline} size="large" />
      <h1>Work in progress</h1>
      <p>This page is under construction. Please check back later.</p>
    </div>
  );
}
