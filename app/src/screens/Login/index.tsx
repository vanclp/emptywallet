import React from 'react';
import {Button, TextInput, View, Text, StyleSheet, Alert} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data, 'data');
  };
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={hello => onChange(hello)}
            value={value}
            placeholder="username"
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, value}}) => (
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={hello => onChange(hello)}
            value={value}
            placeholder="password"
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <Text>This is required.</Text>}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      <Button title="Register" onPress={() => Alert.alert('register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;
