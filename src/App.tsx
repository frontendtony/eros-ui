import {
  IonApp,
  IonIcon,
  IonLabel,
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
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import { cash, home, menu, people, wallet } from "ionicons/icons";
import Bills from "pages/Bills/Bills";
import Visitors from "pages/Visitors/Visitors";
import Wallet from "pages/Wallet/Wallet";
import { Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" render={() => <Tabs />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/bills" exact component={Bills} />
        <Route path="/wallet" exact component={Wallet} />
        <Route path="/visitors" exact component={Visitors} />
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        className="shadow-[0px_0px_3px_0px_rgba(0,0,0,0.26)] py-1"
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
        <IonTabButton tab="more" href="/more" mode="ios">
          <IonIcon icon={menu} />
          <IonLabel>More</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default App;
