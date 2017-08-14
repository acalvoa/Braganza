import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { Config } from '../config/env.config';
export const GOOGLE_CLIENT_ID = '';
export const FACEBOOK_CLIENT_ID = '';
export class MyAuthConfig extends CustomConfig {
	baseUrl = Config.API;
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {
    	google: {clientId: GOOGLE_CLIENT_ID},
    	facebook: {
    		clientId: FACEBOOK_CLIENT_ID,
      		responseType: 'token'
      	}
    };
}
