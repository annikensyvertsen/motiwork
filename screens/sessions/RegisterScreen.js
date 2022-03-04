import React, { useRef } from "react";
import { View, ScrollView, Text, Image, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "react-native-paper";
import styles from "./styles";
import { auth, db } from "../../firebase";
import { registerUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";


const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
  } = useForm();

  const dispatch = useDispatch()
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    registerUser(data, dispatch)
  
  };
  return (
    <ScrollView style={styles.authFormContainer}>
      <View style={styles.inputField}>
        <Text style={styles.headerOne}>Registrer</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>Fornavn</Text>
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
            name="firstname"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.email && (
            <Text style={styles.errorText}>Du må fylle inn fornavn</Text>
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.labelStyle}>Etternavn</Text>
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
            name="surname"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        <View style={styles.errorMsg}>
          {errors && errors.email && (
            <Text style={styles.errorText}>Du må fylle inn etternavn</Text>
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
    </ScrollView>
  );
};
export default RegisterScreen;
