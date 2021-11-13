import React from 'react';
import {
  NativeRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-native';
import { Text, View } from 'react-native';
import KitchenOrders from './components/KitchenOrders';
import EnsambleOrders from './components/EnsambleOrders';
import Recovery from './components/Recovery';
import AppLoading from "expo-app-loading";
import Ordersmainstyles from './assets/styles/Ordersmain.scss';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_900Black,
  Roboto_300Light,
  Roboto_100Thin
} from "@expo-google-fonts/roboto";
import { useDispatch, useSelector } from 'react-redux';
import { switchScreenOn } from './redux/kds/kds';


export default function App () {
  const screenState = useSelector((state) => state.kdsMainSwitchReducer);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_900Black,
    Roboto_300Light,
    Roboto_100Thin
  });
  const dateTime = new Date();
 const handleGetToKitchen = () => {
   console.log('kitchen')
  dispatch(switchScreenOn('kitchen'));
 }
 const handleGetToEnsamle = () => {
  console.log('Ensamble')
  dispatch(switchScreenOn('ensamble'));
 }
 const handleGetToRecovery = () => {
  console.log('Recovery')
  dispatch(switchScreenOn('recover'));
 }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else { return (
    <Router style={Ordersmainstyles.main_container}>
      <View style={Ordersmainstyles.links_container}>
        <Link onPress={() => {handleGetToKitchen();}} style={screenState.kitchen ? Ordersmainstyles.pressed_link_style : Ordersmainstyles.link_style} to="/"><Text style={Ordersmainstyles.link_text_style}>KDS Cocina</Text></Link>
        <Link onPress={() => {handleGetToEnsamle();}} style={screenState.ensamble ? Ordersmainstyles.pressed_link_style : Ordersmainstyles.link_style} to="/ensamble"><Text style={Ordersmainstyles.link_text_style}>KDS Armado</Text></Link>
        <Link onPress={() => {handleGetToRecovery();}} style={screenState.recover ? Ordersmainstyles.pressed_link_style : Ordersmainstyles.link_style} to="/recovery"><Text style={Ordersmainstyles.link_text_style}>Enviados</Text></Link>
        <Text style={Ordersmainstyles.date_style} >{dateTime.getDate()}</Text>
      </View>
      <Routes>
        <Route exact path="/" element={<KitchenOrders />} />
        <Route exact path="/ensamble" element={<EnsambleOrders />} />
        <Route exact path="/recovery" element={<Recovery />} />
      </Routes>
    </Router>
  )
  }
}
