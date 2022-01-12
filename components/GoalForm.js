import { Button, Menu, Divider, Provider, TextInput } from 'react-native-paper';
import React, { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'
import {Keyboard} from 'react-native'


const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

function returnPlaceholder(){

}

function returnPeriod(period){
 if(period === "day"){
   return ""
 }
}

function handleWorkloadChange(e){
   const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({value: e.target.value})
    }
}

const GoalForm = () => {
  const [isOpenPeriodDropdown, setIsOpenPeriodDropdown] = useState(false);
  const [period, setPeriod] = useState(null);
  const [reward, setReward] = useState("")
  const [typesOfPeriod, setTypesOfPeriod] = useState([
    {label: 'Dag', value: 'day'},
    {label: 'Uke', value: 'week'},
    {label: 'Måned', value: 'month'},
  ]);
  const [workload, setWorkload] = useState()

 
  const [date, setDate] = useState('')

  function handleWorkloadChange(amount){
   const re = /^[0-9\b]+$/;
   console.log("e", amount)
    // if value is not blank, then test the regex

    if (/^\d+$/.test(amount) || amount === '') { setWorkload( amount ) }
}

  return(
    <View>
    <Text>Jeg vil sette et mål for</Text>
      <DropDownPicker
        placeholder={"Velg en periode"}
        placeholderStyle={{
          color: "grey",
        }}
        open={isOpenPeriodDropdown}
        value={period}
        items={typesOfPeriod}
        setOpen={setIsOpenPeriodDropdown}
        setValue={setPeriod}
        setItems={setTypesOfPeriod}
        style={{
          borderColor: "#421EB7",
        }}
      />
      <Text>Antall arbeidstimer</Text>
      <DismissKeyboard>
          <TextInput 
            mode={"outlined"}
            value={workload}
            onChangeText={text => setWorkload(text)}
            keyboardType="number-pad"
            placeholder={"40"}
          />
      </DismissKeyboard>

       <TextInput 
        label={"Premie"}
        mode={"outlined"}
        value={reward}
        onChangeText={text => setReward(text)}
        placeholder={"Hjemmelaget middag"}
      />
    </View>
  )
 
}

export default GoalForm;
// <View>
//       <TextInput label="" value={period} onChangeText={}/>
//       <TextInput label="" value={text} onChangeText={}/>
//       <TextInput label="" value={text} onChangeText={}/>
//       <TextInput label="" value={text} onChangeText={}/>

      
//     </View>

// const [period, setPeriod] = useState()

// const [visible, setVisible] = React.useState(false);

// const openMenu = () => setVisible(true);

// const closeMenu = () => setVisible(false);
// return(
//   <Provider>
//     <View
//       style={{
   
//         flexDirection: 'row',
//         justifyContent: 'center',
//       }}>
//       <Menu
//         visible={visible}
//         onDismiss={closeMenu}
//         anchor={<TextInput onPress={openMenu}>Show menu</TextInput>}>
//         <Menu.Item onPress={() => {}} title="Item 1" />
//         <Divider />
//         <Menu.Item onPress={() => {}} title="Item 2" />
//         <Divider />
//         <Menu.Item onPress={() => {}} title="Item 3" />
//       </Menu>
//     </View>
//   </Provider>
// )


//<DropDownPicker
      //   placeholder={returnPlaceholder}
      //   placeholderStyle={{
      //     color: "grey",
      //   }}
      //   open={open}
      //   value={value}
      //   items={items}
      //   setOpen={setOpen}
      //   setValue={setValue}
      //   setItems={setItems}
      //   style={{
      //     borderColor: "#421EB7",
      //   }}
      // />


      
      // <DatePicker
      //   date={date}
      //   mode="date"
      //   placeholder="select date"
      //   format="YYYY-MM-DD"
      //   confirmBtnText="Done"
      //   customStyles={{
      //     dateIcon: {
      //       position: 'absolute',
      //       left: 0,
      //       top: 4,
      //       marginLeft: 0
      //     },
      //     dateInput: {
      //       marginLeft: 36,
      //       borderColor: "#421EB7",
      //       borderRadius: '12px',
      //     }
      //     // ... You can check the source to find the other keys.
      //   }}
      //   onDateChange={(date) => {setDate( date)}}
      // />