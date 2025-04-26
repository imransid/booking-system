import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: moderateScale(16),
    backgroundColor: "#fff",
  },
  input: {
    marginBottom: moderateScale(12),
  },
  button: {
    marginTop: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  buttonContent: {
    height: moderateScale(48),
  },
});

export default styles;
