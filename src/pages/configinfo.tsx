import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import { getConfiguration } from '../configuration/services/AppConfigService';
import { AppConfigData } from '../configuration/models/AppConfigData';

const Info: React.FC = () => {
    const [config, setConfig] = useState<AppConfigData | null>(null);
  
    useEffect(() => {
      const fetchConfig = async () => {
        const config = await getConfiguration();
        setConfig(config);
      };
  
      fetchConfig();
    }, []);
  
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Configuration Info
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Blank</IonTitle>
              </IonToolbar>
            </IonHeader>
            {config && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Configuration Data</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Remote IP: {config.remoteIp}</p>
                  <p>Local IP: {config.localIp}</p>
                  <p>Port: {config.port}</p>
                </IonCardContent>
              </IonCard>
            )}
            <ExploreContainer />
          </IonContent>
        </IonPage>
      );
  };
  
  export default Info;
