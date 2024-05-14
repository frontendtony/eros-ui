import useAuth from "@/auth/useAuth";
import { IonContent } from "@ionic/react";

export default function Home() {
  const { user, estate } = useAuth();

  const greet = () => {
    const currentTime = new Date().getHours();

    return `Good  ${
      currentTime < 12
        ? "morning ☀️"
        : currentTime < 18
        ? "afternoon ☀️"
        : "evening 🌙"
    }`;
  };

  return (
    <IonContent className="ion-padding">
      {/* Greet based on time of the day */}
      <span>{greet()}</span>
      <h1 className="text-3xl">{user?.firstName}</h1>
      <span className="text-sm">{estate?.name}</span>
    </IonContent>
  );
}
