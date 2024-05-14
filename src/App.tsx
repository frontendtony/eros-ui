import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import AuthContextProvider from "@/auth/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import Login from "@/pages/Auth/Login";
import Bills from "@/pages/Bills/Bills";
import Visitors from "@/pages/Visitors/Visitors";
import Wallet from "@/pages/Wallet/Wallet";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import {
  cash,
  closeOutline,
  home,
  logOutOutline,
  menu,
  people,
  wallet,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import useAuth from "./auth/useAuth";
import Dashboard from "./pages/Dashboard/Dashboard";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <AuthContextProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact />
            <Route render={() => <AuthenticatedApp />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContextProvider>
    </IonApp>
  );
}

function AuthenticatedApp() {
  return (
    <>
      <MenuContent />
      <IonTabs>
        <IonRouterOutlet>
          <ProtectedRoute>
            <IonPage id="main-content">
              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/bills" exact component={Bills} />
              <Route path="/wallet" exact component={Wallet} />
              <Route path="/visitors" exact component={Visitors} />
            </IonPage>
          </ProtectedRoute>
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          className="shadow-[0px_0px_3px_0px_rgba(0,0,0,0.26)] py-1 sticky bottom-0"
        >
          <IonTabButton tab="dashboard" href="/dashboard" mode="ios">
            <IonIcon icon={home} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="bills" href="/bills" mode="ios">
            <IonIcon icon={cash} />
            <IonLabel>Bills</IonLabel>
          </IonTabButton>
          <IonTabButton tab="wallet" href="/wallet" mode="ios">
            <IonIcon icon={wallet} />
            <IonLabel>Wallet</IonLabel>
          </IonTabButton>
          <IonTabButton tab="visitors" href="/visitors" mode="ios">
            <IonIcon icon={people} />
            <IonLabel>Visitors</IonLabel>
          </IonTabButton>
          <IonTabButton tab="more" mode="ios">
            <IonMenuToggle>
              <IonTabButton tab="more" mode="ios">
                <IonIcon icon={menu} />
                <IonLabel>More</IonLabel>
              </IonTabButton>
            </IonMenuToggle>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
}

function MenuContent() {
  const { logout } = useAuth();

  return (
    <IonMenu contentId="main-content">
      <div className="flex items-center justify-between ion-padding">
        <IonMenuToggle>
          <IonButton fill="clear" color="dark">
            Close
            <IonIcon icon={closeOutline} slot="start" />
          </IonButton>
        </IonMenuToggle>
        <IonMenuToggle>
          <IonButton fill="clear" color="danger" onClick={logout}>
            Logout
            <IonIcon icon={logOutOutline} slot="end" />
          </IonButton>
        </IonMenuToggle>
      </div>
    </IonMenu>
  );
}

export default App;
