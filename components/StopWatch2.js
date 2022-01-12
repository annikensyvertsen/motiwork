

import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const StopWatch = () => {

  let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

  const [time, setTime] = useState({
    min: 0,
    sec: 0,
    msec: 0
  })

  const [isStarted, setIsStarted] = useState(false); 
  let interval = null;

  const [points, setPoints] = useState(0)

  function handleToggle(){
    console.log("isstarted before",isStarted)

    if(isStarted){
      console.log("in first")
      setIsStarted()

      handleStop()

    }else{
      console.log("in second", isStarted)
      setIsStarted(true)
      console.log("in second after setisstarted", isStarted)

      console.log("isStarted should be true, and is: ", isStarted)


      handleStart()

    }
    //setIsStarted(!isStarted)
    console.log("isstarted after",isStarted)

    //isStarted ? handleStart() : handleStop()



  }

  function handleStart(){
    console.log("handle start", isStarted)
    if(isStarted){
      console.log("should be in here now")
      interval = setInterval(() => {
        console.log("time: ", time)

        if(time.msec !== 99){
          console.log("in msec?")
          setTime((prevState) => ({...prevState, msec: time.msec + 1}))
        }
        else if(time.sec !== 59){
          console.log("in sec?")

          //setTime({...time, msec: 0, sec: ++time.sec})
          setTime((prevState) => ({...prevState, msec: 0, sec: ++time.sec}))

        }
        else{
          console.log()
          //setTime({msec: 0, sec: 0, min: ++time.min})
          setTime((prevState) => ({...prevState,msec: 0, sec: 0, min: ++time.min}))

        }
      }, 1);
    }else{
      clearInterval(interval)
    }
  }

  function handleStop(){
    console.log("stop")
    handleReset();
    //todo: modal med "sikker på at du vil stoppe? du får x poeng"
  }

  function handleReset(){
    setTime({
      min: 0,
      sec: 0,
      msec: 0
    })
    clearInterval(interval)
  }

  useEffect(() => {
    console.log("is started?", isStarted)    
   // console.log("time?", time)

  }, [isStarted, time])
  return (
    <View style={stopwatchStyles.container}>
     <View style={stopwatchStyles.circle}>
      <Text>{points} p</Text>
      <Text>{padToTwo(time.min) + ' : '}</Text> 
      <Text>{padToTwo(time.sec)}</Text>
     </View>

     <Button onPress={(handleToggle)} mode="contained"><Text>{isStarted? "Stop": "Start"}</Text></Button>
    </View>
  );
};
export default StopWatch;


const stopwatchStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 200,
  },
  circle: {
    borderRadius: 200,
    backgroundColor: "#421EB7",
  }
})