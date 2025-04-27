import React, { useState } from 'react';
import { View, TextInput, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SkeletonLoader } from '../../components';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PrimaryButton from '../../components/common/PrimaryButton';  // Import PrimaryButton
import { styles } from './styles';
import { verticalScale } from 'react-native-size-matters';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import { BookingInput, useBooking } from '../../hooks/useBooking'

// Define route params type
type RootStackParamList = {
    AppointmentBooking: {
        service: string;
        hospital: {
            id: string;
            imageUrl: string;
            name: string;
            services: string[];
        };
    };
};

const AppointmentBookingScreen = () => {
    const { params } = useRoute<RouteProp<RootStackParamList, 'AppointmentBooking'>>();
    const { service, hospital } = params;

    const userID = useSelector((state: RootState) => state.users.user.data?.id);
    const navigation = useNavigation();
    const { handleBooking, loading } = useBooking();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [imageError, setImageError] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedService, setSelectedService] = useState(params.service);
    // Error handling state
    const [error, setError] = useState('');

    // Yup validation schema
    const validationSchema = yup.object().shape({
        contact: yup.string().required('Contact number is required').matches(/^[0-9]+$/, 'Contact number must be numeric'),
        service: yup.string().required('Service is required'),
        date: yup.date().required('Date is required'),
        time: yup.date().required('Time is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            contact: '',
            service: service,
            date: date,
            time: time,
        },
    });

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShowDatePicker(false);  // Close date picker after selection
    };

    const handleTimeChange = (event: any, selectedTime?: Date) => {
        if (selectedTime) {
            setTime(selectedTime);
        }
        setShowTimePicker(false);  // Close time picker after selection
    };

    const onSubmit = async (data: any) => {
        try {

            const createBookingInput: BookingInput = {
                contactNumber: data.contact,  // Map 'contact' from form
                bookingService: data.service,  // Map 'service' from form
                bookingDate: new Date(data.date),
                bookingTime: new Date(data.time),
                hospitalId: parseInt(params.hospital.id),  // From route params
                userID: userID === undefined ? 0 : userID,  // Ensure userID is set correctly
            };

            let res = await handleBooking(createBookingInput);  // Pass the mapped data


            if (res) {
                navigation.navigate('HospitalListScreen' as never);
            }

            // Simulate API booking
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error('booking error:', error);
        } finally {

        }
    };

    return (
        <View style={styles.container}>
            {/* Hospital Image */}
            {imageError ? (
                <SkeletonLoader />
            ) : (
                <Image
                    source={{ uri: hospital.imageUrl }}
                    style={styles.hospitalImage}
                    onError={() => setImageError(true)}
                    contentFit="cover"
                />
            )}

            {/* Hospital Name */}
            <Text style={styles.hospitalName}>{hospital.name}</Text>

            {/* Booking Header */}
            <Text style={styles.header}>Book Appointment for {selectedService}</Text>


            <Spinner
                visible={loading}
                textContent={' Loading...'}
            // color={colors.white}
            // textStyle={{ color: colors.white }}
            />

            {/* Scrollable Form */}
            <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: verticalScale(20) }}>
                {/* Service Dropdown */}
                <Controller
                    control={control}
                    name="service"
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            placeholder={{ label: 'Select A Service', value: null }}
                            value={value}
                            onValueChange={(value) => {
                                onChange(value);
                                setSelectedService(value);
                            }}
                            items={hospital.services.map((svc) => ({ label: svc, value: svc }))}
                            style={{
                                inputIOS: styles.inputDropdown,
                                inputAndroid: styles.inputDropdown,
                            }}
                        />
                    )}
                />
                {errors.service && <Text style={styles.errorText}>{errors.service.message}</Text>}

                {/* Date Picker */}
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>{date.toLocaleDateString()}</Text>
                </TouchableOpacity>

                {/* iOS Date Picker Modal */}
                {showDatePicker && Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="inline"
                        onChange={handleDateChange}
                    />
                )}

                {/* Time Picker */}
                <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
                    <Text style={styles.dateButtonText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </TouchableOpacity>

                {/* iOS Time Picker Modal */}
                {showTimePicker && Platform.OS === 'ios' && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="inline"
                        onChange={handleTimeChange}

                    />
                )}

                {/* Android Date/Time Picker */}
                {Platform.OS === 'android' && (
                    <>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        {showTimePicker && (
                            <DateTimePicker
                                value={time}
                                mode="time"
                                display="default"
                                onChange={handleTimeChange}
                                is24Hour={false}
                            />
                        )}
                    </>
                )}

                {/* Contact Input */}
                <Controller
                    control={control}
                    name="contact"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Enter Contact Number"
                            keyboardType="phone-pad"
                            style={styles.input}
                        />
                    )}
                />
                {errors.contact && <Text style={styles.errorText}>{errors.contact.message}</Text>}

                {/* Error Message */}
                {error && <Text style={styles.errorText}>{error}</Text>}

                {/* Submit Button using PrimaryButton */}
                <PrimaryButton
                    title="Book Appointment"
                    onPress={handleSubmit(onSubmit)}
                    loading={false}
                    disabled={false}
                />
            </ScrollView>
        </View>
    );
};

export default AppointmentBookingScreen;


