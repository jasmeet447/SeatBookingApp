import Amplify from 'aws-amplify';
import * as Config from './config';

export const configureAmplify = () => {
  Amplify.configure(Config.configData)
}
