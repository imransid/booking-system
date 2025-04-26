import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface ErrorTextProps {
    message?: string;
}

/**
 * Common component for showing error messages under input fields.
 * @param {string} message - Error message to display
 */
const ErrorText: React.FC<ErrorTextProps> = ({ message }) => {
    if (!message) return null;

    return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: moderateScale(12),
        marginBottom: moderateScale(8),
        marginLeft: moderateScale(4),
    },
});

export default ErrorText;
