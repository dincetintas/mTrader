import axios from 'axios';
import { AppConfigData} from "../models/AppConfigData";
import { AppConfigClient, GetConfigurationCommand   } from "@aws-sdk/client-appconfig";
import { v4 as uuidv4, v4 } from 'uuid';



const config = {
    Application: 'MTrader',
    Environment: 'Mtrader-GUI-Env',
    Configuration: 'Mtrader-GUI',
    ClientId: uuidv4(), // You can generate a UUID here
};

const client = new AppConfigClient({
    region: 'eu-west-2',
    credentials: {
        accessKeyId: 'AKIAWXFCHT5VWQVDT6UY',
        secretAccessKey: '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'
    }
});

export const getConfiguration = async (): Promise<AppConfigData | null> => {
    try {
        const command = new GetConfigurationCommand(config);
        const response = await client.send(command);
        
        // Check if response.Content exists
        const configData = response.Content ? JSON.parse(response.Content.toString()) : null;

        if (configData) {
            return new AppConfigData(
                configData.remoteIp,
                configData.localIp,
                configData.port
            );
        } else {
            console.error("Empty configuration data.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching configuration:", error);
        return null;
    }
}


/*
export const configDetails = {
    application: 'MTrader',
    environment: 'Mtrader-GUI-Env',
    configuration: 'Mtrader-GUI',
    clientId: uuidv4(), 
    region: 'eu-west-2',
    credentials: {
      accessKeyId: 'AKIAWXFCHT5VWQVDT6UY',
      secretAccessKey: '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'
    }
  };



export const getConfiguration = async (): Promise<AppConfigData | null> => {
    try{
        const response = await axios.get('https://appconfig.${client.region}.amazonaws.com/applications/${config.Application}/environments/${config.Environment}/configurations/${config.Configuration}',{
            headers: {
                'x-aws-AppConfig-ClientId': configDetails.clientId
            },
            auth: {
                username: configDetails.credentials.accessKeyId,
                password: configDetails.credentials.secretAccessKey
            }
        });
        console.log('Response:', response); // Log the entire response

        const configData = JSON.parse(response.data);

        console.log('Config Data:', configData); // Log the parsed configuration data
        
        return new AppConfigData(
            configData.remoteIp,
            configData.localIp,
            configData.port
        );

    }catch(error){
        console.error("Error fetching configuration:", error);
        return null;
    }
}
*/





