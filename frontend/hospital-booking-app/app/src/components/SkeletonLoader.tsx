import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';


const SkeletonLoader = () => {
    return (
        <View style={styles.skeletonContainer}>
            <Animated.View style={[styles.skeletonImage, styles.skeleton]} />
            <Animated.View style={[styles.skeletonText, styles.skeleton]} />
            <Animated.View style={[styles.skeletonText, styles.skeleton]} />
        </View>
    );
};

export default SkeletonLoader;

const styles = StyleSheet.create({


    skeletonContainer: {
        width: '100%',
        height: verticalScale(200),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(8),
    },
    skeleton: {
        backgroundColor: '#ddd',
        borderRadius: moderateScale(8),
    },
    skeletonImage: {
        width: '100%',
        height: verticalScale(200),
        marginBottom: verticalScale(10),
    },
    skeletonText: {
        width: '80%',
        height: verticalScale(20),
        marginBottom: verticalScale(10),
    },
});