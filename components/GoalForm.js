import React, { useState } from "react";
import { Button, Menu, Provider, TextInput } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import { auth } from "../firebase";
import { useDispatch} from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { containerStyles } from "./styles/sharedStyles";
import { setUserGoal } from '../store/actions/goalActions';

import DateTimePicker from '@react-native-community/datetimepicker';



const GoalForm = ({ submitted, setSubmitted}) => {
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

  const [reward, setReward] = useState('');
  const predefinedRewards = ["Ingenting", "Foodora til middag", "Nye sko", "Middag ute", "En fridag"]
  const [visible, setVisible] = useState(!visible);

  const [isWorkloadString, setIsWorkloadString] = useState(false)

  const [workload, setWorkload] = useState(0)
  const [goalName, setGoalName] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(dateTomorrow)

  let currentUser = auth.currentUser;

  const openMenu = () => {
    setVisible(!visible)
  };

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
    if(/^\d+$/.test(workload)){
      setIsWorkloadString(false)
      const data = {
        goalName: goalName,
        reward: reward,
        startDate: startDate,
        endDate: endDate,
        workloadGoal: parseInt(workload),
        workload: 0,
      }
      await setUserGoal(data, currentUser.uid, dispatch).then(() => {
        setSubmitted(!submitted)
      })
      .catch(error => console.log("error", error))
    }else{
      console.log("not numbers")
      setIsWorkloadString(true)
    }
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
              type="string"
              label="Antall timer"
              mode={"outlined"}
              value={workload.toString()}
              onChangeText={load => setWorkload(load.toString())}
            />
          )}
          name="numberOfHours"
      />

      </View>

      <View style={containerStyles.flexWithMarginTop}>
        <Text>Hva skal du unne deg selv hvis du når målet ditt?</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.container}>
            <TextInput
              placeholder="Foodora til middag"
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


