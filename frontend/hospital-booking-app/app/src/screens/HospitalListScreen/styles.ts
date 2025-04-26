import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: colors.linkWater,
    height: scale(80),
  },
  searchInput: {
    height: verticalScale(20),
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(10),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(10),
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    marginTop: 10,
    marginBottom: verticalScale(12),
    borderRadius: moderateScale(8),
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: scale(15),
  },
  cardImage: {
    height: verticalScale(200),
    width: "100%",
    borderRadius: moderateScale(8),
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#333",
    marginTop: verticalScale(10),
  },
  skeletonContainer: {
    width: "100%",
    height: verticalScale(200),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(8),
  },
  skeleton: {
    backgroundColor: "#ddd",
    borderRadius: moderateScale(8),
  },
  skeletonImage: {
    width: "100%",
    height: verticalScale(200),
    marginBottom: verticalScale(10),
  },
  skeletonText: {
    width: "80%",
    height: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  subheader: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: scale(89),
  },
  errorText: {
    color: colors.failure,
  },
  noResultsText: {
    color: colors.warning,
  },
});
