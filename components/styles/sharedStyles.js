import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const yellowColor = "#FFB61D"

export const buttonStyles = StyleSheet.create({
  secondaryButton: {
    backgroundColor: yellowColor,
    width: 180,
  },
})


export const textStyles = StyleSheet.create({
  secondaryButtonText: {
    color: "white",
    fontSize: 20
  },
  secondaryHeadingText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  tertiaryHeadingText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  greyText: {
    fontSize: 16,
    color: "#636363"
  },
  greyTextBold: {
    fontSize: 16,
    color: "#636363",
    fontWeight: "bold"
  },
})

export const containerStyles = StyleSheet.create({
  flexBoxWithMarginTop: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  flexWithMarginTop: {
    flex: 1,
    marginTop: 20,
  },
})

export const cardStyles = StyleSheet.create({
  primaryCard: {
    borderRadius: 10,
    borderColor: DefaultTheme.colors.primary,
    borderWidth: 1.5,
    padding: 10
  }
})
