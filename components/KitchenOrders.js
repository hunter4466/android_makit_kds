import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, resetTimers, switchScreen, updateTimers } from '../redux/kds/kds';
import Ordersmainstyles from '../assets/styles/Ordersmain.scss';
import Timer from './utils/timer';
import msToTime from './utils/timer';
/*import Sound from 'react-native-sound';*/

const KitchenOrders = () => {
  const dispatch = useDispatch();
  const infoContent = useSelector((state) => state.kdsMainServiceReducer);
  const [timersState, updTimerState] = useState({})
  const screenState = useSelector((state) => state.kdsMainSwitchReducer);
  
  const fetchFunc = () => {
    setInterval(() => {
      if(screenState.kitchen){
        dispatch(loadOrders());
      }
    }, 10000)
  };

  const updTimers = () => {
    setInterval(() => {
      const times = {}
      infoContent.forEach((e) => {
        const newTime = Date.now();
        const rest = newTime - e.hora_orden
        console.log(e.idordenes, rest)
        times[e.idordenes] = msToTime(rest)
      })
      console.log(times)
      updTimerState(times)
    }, 1000)
  }

  useEffect(() => {
    fetchFunc();
    updTimers();
  }, []);

  const evaluator = (type, quant) => {
    if (type === 'makis') {
      const flt = parseFloat(quant);
      return flt / 2;
    }
    return quant;
  };

  const handleOrderClick = (id) => {
   dispatch(sendToEnsamle(id))
  }

  const emogiator = (params) => {
    switch (params) {
      case 'bebidas':
        return '🍺'
      case 'salsas incluidas':
        return '🍼'
      case 'makis':
        return '🍣'
      case 'alitas':
        return '🍗'
      case 'gyosas':
        return '🥐'
      case 'gohanrolls':
        return '🍙'
      default:
        return '🍭'
    }
  };

  return (
    <ScrollView horizontal={true} style={Ordersmainstyles.orders_main_container}>
      {infoContent.map((e) => (
        e.kitchen_state ? <TouchableHighlight onPress={() => { handleOrderClick();}} style={Ordersmainstyles.single_order_main_container} key={e.idordenes}>
          <ScrollView style={Ordersmainstyles.single_order_container}>
            <View style={Ordersmainstyles.timer_wrapper}><Text style={Ordersmainstyles.timer}>{timersState[e.idordenes]}</Text></View>
            <Text style={Ordersmainstyles.customername}>{e.order_detail.customername}</Text>
            {e.order_detail.ordercontent.map((a) => (
              <View style={Ordersmainstyles.content_frame} key={a.code}>
                <Text style={Ordersmainstyles.producttitle}>{'🍱 ' + a.header}</Text>
                {a.content.map((b) => (
                  <View style={Ordersmainstyles.content_frame} key={b.header}>
                    <Text style={Ordersmainstyles.sub_product_title}>{emogiator(b.header) + b.header.charAt(0).toUpperCase() + b.header.slice(1)}</Text>
                    {b.content.map((c) => (
                      <View style={Ordersmainstyles.content_frame} key={c.name}>
                        {c.quantity > 0
                          ? (
                            <Text style={Ordersmainstyles.sub_sub_product}>
                              {'- '}
                              {c.name}
                              {' x '}
                              {evaluator(b.header, c.quantity)}
                            </Text>
                          )
                          : null}
                      </View>
                    ))}
                  </View>
                ))}
                <Text style={Ordersmainstyles.sub_sub_product}>---------------------------------</Text>
              </View>
            ))}
            <Text></Text>
          </ScrollView>
        </TouchableHighlight> : null
      ))}
    </ScrollView>
  );
};

export default KitchenOrders;
