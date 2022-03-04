import React from "react";
import { View, Text, ScrollView, useWindowDimensions, Image,StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import styles from "./styles";
import { auth } from "../../firebase";
import { loginUser } from "../../store/actions/userActions";
import { useDispatch} from 'react-redux';

const LoginScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()

  const { height, width } = useWindowDimensions()

  console.log("height: ", height)
  const onSubmit = (data) => {
    loginUser(data, dispatch)
  };

  return (
    <ScrollView style={height <= 700 ? loginStyles.smallAuthFormContainer : loginStyles.authFormContainer }>
      <Image
        source={require("../../assets/doinghomework.png")}
        style={loginStyles.image}
      />
      <View style={styles.inputField}>
        <Text style={styles.headerOne}>Logg inn</Text>
        <View style={styles.inputWrapper}>
          <Text>E-mail</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"olan@gmail.com"}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.email && (
            <Text style={styles.errorText}>Du må fylle inn email</Text>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text>Passord</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"passord123"}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>

        <View style={styles.errorMsg}>
          {errors && errors.password && (
            <Text style={styles.errorText}>Du må fylle inn passord</Text>
          )}
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          compact={false}
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        >
          Logg inn
        </Button>
      </View>

      <View style={styles.noAccount}>
        <Button
          mode="outlined"
          compact
          style={styles.button2}
          onPress={() => navigation.navigate("register")}
        >
          Registrer konto
        </Button>
      </View>
    </ScrollView>
  );
};
const loginStyles = StyleSheet.create({
   image: {
    padding: 0, 
    width: 185, 
    height: 150, 
    alignSelf: "center",
    
   },
   authFormContainer: {
    paddingTop: '20%',
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
   },
   smallAuthFormContainer: {
    paddingTop: '6%',
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
   }
})

export default LoginScreen;
