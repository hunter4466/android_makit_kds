import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, resetTimers, switchScreen, updateTimers } from '../redux/kds/kds';
import Ordersmainstyles from '../assets/styles/Ordersmain.scss';
import Timer from './utils/timer';
/*import Sound from 'react-native-sound';*/

const KitchenOrders = () => {
  const dispatch = useDispatch();
  const infoContent = useSelector((state) => state.kdsMainServiceReducer);
  const [timersState, updTimerState] = useState({})
  const screenState = useSelector((state) => state.kdsMainSwitchReducer);
  /*Sound.setCategory('Playback')
  var new_order_sound = new Sound('new_order.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
  });
  new_order_sound.setVolume(1);
  */
  const fetchFunc = () => {
    if(screenState.kitchen){
      dispatch(loadOrders());
      setTimeout(() => {
        fetchFunc();
      }, 5000);
    }
    setTimeout(() => {
      fetchFunc();
    }, 5000);
  };
/*
  const interval = () => {
    console.log('working')
    const tkeys = Object.keys(timersState)
    tkeys.forEach((e) => {
      timerrssState[e].stopTimer = false
    })
    let newTimers = {}
    infoContent.forEach((e) => {
      newTimers[e.id] = new Timer(e.idordenes, e.hora_orden)
    })
    updTimerState(newTimers)
    setTimeout(() => {
      interval();
    }, 1000);
  };
*/
  useEffect(() => {
    fetchFunc();
   /* interval();*/
  }, []);

  const evaluator = (type, quant) => {
    if (type === 'makis') {
      const flt = parseFloat(quant);
      return flt / 2;
    }
    return quant;
  };

  const handleOrderClick = () => {
   /* new_order_sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });*/
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
