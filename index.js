import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import Main from './Main';
import {name as AppName} from './app.json';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Main);
