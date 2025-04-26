import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles';
import ErrorText from '../../components/common/ErrorText';
import { loginFormValidationSchema } from '../../utils/formValidation';

interface ILoginFormData {
    email: string;
    password: string;
}

/**
 * LoginScreen Component
 * Handles user login using react-hook-form and yup validation.
 */
const LoginScreen: React.FC = () => {
    const { colors } = useTheme();
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ILoginFormData>({
        resolver: yupResolver(loginFormValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    /**
     * Called when login form is submitted.
     * @param data - Form values containing email and password
     */
    const onSubmit = async (data: ILoginFormData) => {
        try {
            setLoading(true);
            console.log('Login Form Data:', data);
            // Simulate API login
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Email Input */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Email"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        error={!!errors.email}
                    />
                )}
            />
            <ErrorText message={errors.email?.message} />

            {/* Password Input */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label="Password"
                        mode="outlined"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={secureText}
                        style={styles.input}
                        error={!!errors.password}
                        right={
                            <TextInput.Icon
                                icon={secureText ? 'eye-off' : 'eye'}
                                onPress={() => setSecureText(!secureText)}
                            />
                        }
                    />
                )}
            />
            <ErrorText message={errors.password?.message} />

            {/* Login Button */}
            <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                disabled={loading}
                style={styles.button}
                contentStyle={styles.buttonContent}
            >
                Login
            </Button>
        </View>
    );
};

export default LoginScreen;
