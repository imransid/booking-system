import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: scale(10),
    paddingBottom: scale(20),
  },
  hospitalImage: {
    width: "100%",
    height: height * 0.4,
    marginBottom: verticalScale(16),
    borderRadius: scale(10),
  },
  hospitalName: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: verticalScale(24),
  },
  input: {
    height: verticalScale(40),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(12),
  },
  inputDropdown: {
    height: verticalScale(50),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(12),
    justifyContent: "center",
  },
  dateButton: {
    height: verticalScale(40),
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(8),
    marginBottom: verticalScale(12),
  },
  dateButtonText: {
    fontSize: moderateScale(16),
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: verticalScale(16),
  },
});
