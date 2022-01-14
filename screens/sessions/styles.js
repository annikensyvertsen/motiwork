import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  mainContentContainer: {
    margin: 30,
  },
  standardflexColumnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 10,
  },
  modalView: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 500,
    borderRadius: 12,
    height: 10
  },
  authFormContainer: {
    paddingTop: 100,
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },
  inputField: {
    margin: 50,
    width: "100%",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    marginTop: 20,
  },
  formInput: {
    width: "70%",
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  labelStyle: {
    width: 150,
  },

  submitButton: {
    margin: 10,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 30,
    width: "70%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  button2: {
    borderRadius: 30,
    width: "70%",
    alignSelf: "center",
  },
  noAccount: {
    display: "flex",
    justifyContent: "center",
  },
  alreadyAccount: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  errorMsg: {
    marginLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  headerOne: {
    fontSize: 40,
    fontFamily: "roboto-bold",
  },
  headingThree: {
    color: "#979797"
  },
  courseTitleContainer: {
    display: "flex",
    flexDirection: "column",
  },
});
export default styles;
