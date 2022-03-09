import React, { useState } from "react";
import { Button, Menu, Provider, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import { auth } from "../../firebase";
import { useDispatch} from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { containerStyles } from "../styles/sharedStyles";
import { setUserGoal } from '../../store/actions/goalActions';

import DateTimePicker from '@react-native-community/datetimepicker';



const EditGoalForm = ({ goal, submitted, setSubmitted}) => {
   const {
     control,
     formState: { errors },
   } = useForm({
     defaultValues: {
      nameOfGoal: "",
      numerOfHours: "",
      reward: "",
      startDate: "",
      endDate: "",
     }
   });

   //todo: legge til error i form

  let dispatch = useDispatch()
  let dateTomorrow = new Date((new Date()).getTime() + 86400000);

  console.log("goal", goal)
  const [reward, setReward] = useState(goal.reward);
  const predefinedRewards = ["Ingenting", "En gratis middag", "En kinodate", "En kaffedate"]
  const [visible, setVisible] = useState(!visible);

  //todo - fikse så dette ikke er string når jeg fikser workload
  const [workload, setWorkload] = useState(goal.workloadGoal.toString())
  const [goalName, setGoalName] = useState(goal.goalName)

  const [startDate, setStartDate] = useState(new Date(goal.startDate.seconds * 1000))
  const [endDate, setEndDate] = useState(new Date(goal.endDate.seconds * 1000))

  let currentUser = auth.currentUser;

  const openMenu = () => {
    setVisible(!visible)
  };

  //TODO: denne skal kun akseptere nummer -> how
  const checkIfNumbers = (load) => {
    console.log("load", load)
    if(isNaN(parseInt(load))){
      console.log("hello")
      return 
    }
    else {
      setWorkload(parseInt(load))
    }
  }

  const allowOnlyNumber=(value)=>{
    return value.replace(/[^0-9]/g, '')
 }

  const closeMenu = () => setVisible(!visible);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    if(currentDate > endDate){
      setEndDate(new Date(startDate.getTime() + 86400000))
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);

  };


  const onSubmit = async () => {
    const data = {
      goalName: goalName,
      reward: reward,
      startDate: startDate,
      endDate: endDate,
      workloadGoal: workload,
      workload: goal.workload
    }
    await setUserGoal(data, currentUser.uid, dispatch).then(() => {
      setSubmitted(!submitted)
    })
    .catch(error => console.log("error", error))
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
         render={({ field: { onChangeText, onBlur, value } }) => (
           <TextInput
            label="Navn på målet"
             mode={"outlined"}
             value={goalName}
             onChangeText={name => setGoalName(name)}
             placeholder={"Jobbe minst førti timer "}

            />
         )}
         name="nameOfGoal"
       />
      </View>

      <View style={containerStyles.flexWithMarginTop}>
       <Controller
        control={control}
          rules={{
          required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              type="number"
              label="Antall timer"
              mode={"outlined"}
              value={workload}
              onChangeText={load => setWorkload(load)}
            />
          )}
          name="numberOfHours"
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
          name="reward"
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
          name="startDate"
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
        <Button title="Submit" mode="contained" onPress={onSubmit}>Lagre</Button>
      </View>

    </View>
  </Provider>

  )

}

export default EditGoalForm;

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


