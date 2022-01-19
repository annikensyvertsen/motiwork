import { Button, Menu, Provider, TextInput, IconButton } from 'react-native-paper';
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from 'react-native';

import { useForm, Controller } from "react-hook-form";

import DateTimePicker from '@react-native-community/datetimepicker';

import { containerStyles } from "./styles/sharedStyles";


const GoalForm = () => {
   const {
     control,
     handleSubmit,
     register,
     formState: { errors },
   } = useForm();


  /*
  form: 
  - fyll inn startdato
  - fyll inn sluttdato
  - navn på målet
  - ønsket premie
  - antall timer man ønsker å arbeide
  */

  let dateTomorrow = new Date((new Date()).getTime() + 86400000);
  const [reward, setReward] = useState('');
  const predefinedRewards = ["Ingenting", "En gratis middag", "En kinodate", "En kaffedate"]
  const [menuVisible, setMenuVisible] = useState(!menuVisible);
  const [visible, setVisible] = useState(!visible);
 
  const [workload, setWorkload] = useState()
  const [goalName, setGoalName] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(dateTomorrow)


  const openMenu = () => {
    setVisible(!visible)
  };

  const checkIfNumbers = (load) => {
    console.log("load", load, workload)
    if (/^\d+$/.test(load.toString())) { 
      console.log("test", workload)

      setWorkload(load)
    }
  }

  const closeMenu = () => setVisible(!visible);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    console.log("currentdate", currentDate, "end date", endDate)

    if(currentDate > endDate){
      console.log("in here")
      setEndDate(new Date(startDate.getTime() + 86400000))
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    
  };


  const onSubmit = (data) => {
    console.log("data: ", data)
  }

  return(
    
    <Provider style={styles.provider}>
    <View style={styles.formWrapper}>

    <View style={{flex: 1}}>
      <Controller
        control={control}
         rules={{
         required: true,
         }}
         render={({ field: { onChange, onBlur, value } }) => (
           <TextInput 
            label="Navn på målet"
             mode={"outlined"}
             value={goalName}
             onChangeText={name => setGoalName(name)}
             placeholder={"Jobbe minst førti timer "}
            
            />
         )}
         name="goalname"
       />
      </View>

      <View style={containerStyles.flexWithMarginTop}>
       <Controller
        control={control}
          rules={{
          required: true,
          pattern: /^\d+$/
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              type="number"
              label="Antall timer"
              mode={"outlined"}
              value={workload}
              onChange={load => checkIfNumbers(load)}
              placeholder={"40"}
            
            />
          )}
          name="goalname"
      />

      </View>

      <View style={containerStyles.flexWithMarginTop}>
        <Controller 
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.container}>
            <TextInput
              placeholder="En gratis middag"
              mode="outlined"
              label="Premie"
              value={reward}
              onChangeText={setReward}
              right={
                <TextInput.Icon
                  name={"chevron-down"} 
                  onPress={openMenu}
                />
              }
            />
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            <Menu
            style={styles.menu}
            visible={visible}
            onDismiss={closeMenu}
            anchor={{ x: 100, y: -20 }}>

              {predefinedRewards.map(r => (
              <Menu.Item key={r} onPress={() => setReward(r)} title={r} />
              ))}     
            </Menu>
        </View>
        </View>
          )}
        />
      </View>

      <View style={styles.datesContainer}>
        <Controller
        control={control}
        rules={{required: true,}}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.dateWrapper}>
            <Text style={styles.datePickerText}>Startdato for målet</Text>
              <View>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode={'date'}
                  display="default"
                  style={styles.datePicker}
                  onChange={onStartDateChange}
                />  
              </View>
          </View>
          )}
          name="startdate"
        />

        <Controller
        control={control}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.dateWrapper}>
            <Text style={styles.datePickerText}>Sluttdato for målet</Text>
            <View>
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={'date'}
                style={styles.datePicker}
                display="default"
                onChange={onEndDateChange}
                minimumDate={new Date(startDate.getTime() + 86400000)} 
              />  
              </View>
          </View>
          )}
          name="endDate"
        />
      </View>



      <View style={containerStyles.flexWithMarginTop}>
        <Button title="Submit" mode="contained" onPress={handleSubmit(onSubmit)}>Lagre</Button>

      </View>
      </View>

  </Provider>

  )
 
}

export default GoalForm;

const styles = StyleSheet.create({
  provider: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    justifyContent: "space-around",
    padding: 30,
    height: '100%',
  },
  datesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20
  },
  datePicker: {
    alignSelf: 'flex-start',
    paddingLeft: 120,
  },
  dateWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  datePickerText: {
    marginBottom: 10
  },
  container: {
    flex: 1,
  },
  menu: {
    top:10
  },

});


