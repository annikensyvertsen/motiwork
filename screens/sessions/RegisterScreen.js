import React, { useRef } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import styles from "./styles";
import { auth, db } from "../../firebase";


const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    console.log(data);
    const { email, password, name } = data;
    auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then(function (result) {  
        db.collection('usersCollection').doc(result.user.uid).set({
          uid: result.user.uid,
          points: 0
        })      
       .then(function (result) {
          //todo: skal denne gjøre noe?
          //console.log("result of user collection: ", result)
        }).catch(function(error){
          console.log(error)
        })
        return result.user.updateProfile({
          displayName: name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.authFormContainer}>
      <View style={styles.inputField}>
        <Text style={styles.headerOne}>Registrer</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>Navn</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"Ola Nordmann"}
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.email && (
            <Text style={styles.errorText}>Du må fylle inn navn</Text>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>E-mail</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"ola@gmail.com"}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.email && (
            <Text style={styles.errorText}>Du må fylle inn </Text>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>Passord</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"password123"}
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
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>Gjenta passord</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                secureTextEntry
                onBlur={onBlur}
                onChangeText={(v) => onChange(v)}
                value={value}
                style={styles.formInput}
                placeholder={"password123"}
              />
            )}
            name="passwordConf"
            rules={{
              required: true,
              validate: (value) =>
                value === password.current || "The passwords does not match",
            }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.passwordConf && (
            <Text>{errors.passwordConf.message}</Text>
          )}
        </View>
      </View>

      <View>
        <Button
          mode="contained"
          compact={false}
          style={styles.button2}
          onPress={handleSubmit(onSubmit)}
        >
          Registrer konto
        </Button>
      </View>

      <View style={styles.alreadyAccount}>
        <Text style={{ marginBottom: 10 }}>Har du allerede konto?</Text>
        <Button
          mode="outlined"
          compact
          style={styles.button2}
          onPress={() => navigation.goBack()}
        >
          Logg inn
        </Button>
      </View>
    </View>
  );
};
export default RegisterScreen;
