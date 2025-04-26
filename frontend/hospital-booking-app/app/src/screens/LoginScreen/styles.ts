import { StyleSheet } from "react-native";
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import { colors } from "../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shineWhite,
  },
  avatarContainer: {
    position: "absolute",
    top: verticalScale(180),
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: moderateScale(50),
    padding: moderateScale(5),
  },
  topSection: {
    height: verticalScale(220),
    borderBottomLeftRadius: moderateScale(40),
    borderBottomRightRadius: moderateScale(40),
    overflow: "hidden",
  },
  profileImage: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayBlack35,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(-40),
  },
  globalPadding: {
    paddingHorizontal: moderateScale(20),
    marginTop: verticalScale(30),
  },
  input: {
    marginTop: verticalScale(15),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    elevation: 2,
    height: verticalScale(40),
    justifyContent: "center",
  },
  button: {
    marginTop: verticalScale(50),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    elevation: 3,
    height: verticalScale(40),
    justifyContent: "center",
  },
  buttonContent: {
    height: verticalScale(50),
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: verticalScale(20),
  },
  linkText: {
    color: colors.lightBlue,
    fontSize: moderateScale(14),
    fontWeight: "500",
  },
  textHeader: {
    color: colors.white,
  },
});

export default styles;
