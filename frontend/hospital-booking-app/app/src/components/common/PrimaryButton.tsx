import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { scale, verticalScale } from 'react-native-size-matters';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  contentStyle?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  contentStyle,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      contentStyle={[styles.buttonContent, contentStyle]}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: verticalScale(10),
    borderRadius: scale(8),
  },
  buttonContent: {
    height: verticalScale(45),
  },
});

export default PrimaryButton;
