import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
const CoursesTab = ({ navigation }) => {
  let registeredCourses = [];

  return (
    <View>
      {registeredCourses.length === 0 ? (
        <View>
          <Text>No courses registered yet. </Text>
          <Button onPress={() => navigation.navigate("registerCourses")}>
            Registrer emner
          </Button>
        </View>
      ) : (
        <View>
          <Text>{registeredCourses.map((e) => e)}</Text>
        </View>
      )}
    </View>
  );
};
export default CoursesTab;
