

import React, { useState } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { TextInput, Button, useTheme, Text, Avatar, } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from './styles'; // Assuming you have styles in a separate file
import ErrorText from '../../components/common/ErrorText'; // Assuming you have a custom error component
import { loginFormValidationSchema } from '../../utils/formValidation'; // Assuming you have a validation schema

interface ILoginFormData {
    email: string;
    password: string;
}

/**
 * LoginScreen Component
 * Handles user login using react-hook-form and yup validation.
 */
const LoginScreen: React.FC = () => {
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

            <ImageBackground
                source={{
                    uri: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                }}
                style={styles.topSection}
                imageStyle={styles.profileImage}
            >
                {/* Optional overlay to darken the image */}
                <View style={styles.overlay}></View>
            </ImageBackground>


            <View style={styles.avatarContainer}>
                <Avatar.Image
                    size={80}
                    source={{ uri: 'http://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg' }}
                />

            </View>

            <View style={styles.globalPadding}>

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

                {/* SMS Login and Forgot Password */}
                <View style={styles.row}>

                    <TouchableOpacity>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;
