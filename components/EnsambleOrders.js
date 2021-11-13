import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrders, switchScreen } from '../redux/kds/kds';
import Ordersmainstyles from '../assets/styles/Ordersmain.scss';
/*import Sound from 'react-native-sound';*/

const EnsambleOrders = () => {
  const dispatch = useDispatch();
  const infoContent = useSelector((state) => state.kdsMainServiceReducer);
  const timersState = useSelector((state) => state.timersReducer);
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
  let count = 0;
  const fetchFunc = () => {
    if(screenState.ensamble){
      if (count === 120) {
        console.log('This screen should be reloading')
      }
      count += 1;
      dispatch(loadOrders());
      setTimeout(() => {
        fetchFunc();
      }, 5000);
    }
    setTimeout(() => {
      fetchFunc();
    }, 5000);
  };


  const msToTime = (duration) => {
    if(duration > 0) {
      var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
      days = Math.floor((duration / (1000*60*60*24)) % 7);
   
     hours = (hours < 10) ? "0" + hours : hours;
     minutes = (minutes < 10) ? "0" + minutes : minutes;
     seconds = (seconds < 10) ? "0" + seconds : seconds;
     days = (days > 0) ? days + " Días " : '';
     return days + hours + ":" + minutes + ":" + seconds;
    }
    return 'Loading Timer'
  }

  useEffect(() => {
    fetchFunc();
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
        e.ensamble_state ? <TouchableHighlight onPress={() => { handleOrderClick();}} style={Ordersmainstyles.single_order_main_container} key={e.idordenes}>
          <ScrollView style={Ordersmainstyles.single_order_container}>
            <View style={Ordersmainstyles.timer_wrapper}><Text style={Ordersmainstyles.timer}>{msToTime(timersState[e.idordenes])}</Text></View>
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

export default EnsambleOrders;
