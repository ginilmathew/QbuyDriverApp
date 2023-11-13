import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import CommonInput from '../CommonInput'
import CommonSelectDropdown from '../CommonSelectDropdown'
import CommonPicker from '../CommonPicker'
import CustomButton from '../CustomButton'
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import reactotron from 'reactotron-react-native'

const phoneRegExp = /^(0|[1-9]\d*)(\.\d+)?$/

const BasicDetails = ({ tabChange, onsubmit, data }) => {

    const genderData = [
        { label: 'Male', value: '1' },
        { label: 'Female', value: '2' },
    ];

    const [selectedImage, setSelectedImage] = useState('')

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        mobile: yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(10, 'Mobile Number should be atleast 10 digits.').max(10, 'Mobile Number should not excced 10 digits.').required('Mobile Number is required !'),
        emergency_contact: yup.string().matches(phoneRegExp, 'Mobile number is not valid').min(10, 'Mobile Number should be atleast 10 digits.').max(10, 'Mobile Number should not excced 10 digits.').required('Mobile Number is required !'),
        gender: yup.string().required('Gender is required'),
        image: yup.object()
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, setError, getValues } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: data
    });

    const ImagePicker = () => {

        let options = {
            storageOptions: {
                path: 'image'
            },
        };

        launchImageLibrary(options, (response) => {
            reactotron.log(response, "res1")
            if (response.assets?.[0].fileSize > 2000000) {
                Toast.show({
                    backgroundColor: 'error.500',
                    description: 'Please upload image below 2MB',
                    duration: 1500
                })
                return
            }

            if (response.assets?.length > 0) {
                //reactotron.log({ file: response?.assets?.[0] }, "UPLOAD")
                if (response?.assets?.[0]?.type === 'image/jpeg' || response?.assets?.[0]?.type === 'image/jpg' || response?.assets?.[0]?.type === 'image/png') {

                    let imageData = {
                        name: response.assets[0]?.fileName,
                        type: 'image/jpeg',
                        uri: response.assets[0]?.uri
                    }
                    setSelectedImage(imageData);
                    setValue("image", imageData)
                }
                else {
                    Toast.show({
                        description: 'Please choose jpg/jpeg/png type image',
                        duration: 1500
                    })
                }
            }

        });
    };

    const formOne = useCallback((data) => {
        reactotron.log(data, "DATA")
        onsubmit(data)
        tabChange()
    }, [])

    const changeGender = useCallback((value) => {
        setValue("gender", value)
        setError("gender", null)
    }, [])

    return (
        <>
            <CommonInput
                leftElement
                control={control}
                error={errors.name}
                fieldName="name"
                placeholder='Name'
                inputMode={'text'}
                mt={20}
                icon={<Ionicons name='person' color='#58D36E' size={25} />}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.mobile}
                fieldName="mobile"
                placeholder='Mobile Number'
                inputMode={'numeric'}
                mt={20}
                icon={<Fontisto name='mobile' color='#58D36E' size={25} />}
                length={10}
            />
            <CommonInput
                leftElement
                control={control}
                error={errors.emergency_contact}
                fieldName="emergency_contact"
                placeholder='Emergency Contact'
                inputMode={'numeric'}
                length={10}
                mt={20}
                icon={<Fontisto name='mobile' color='#58D36E' size={25} />}
            />
            {/* <CommonInput
        leftElement
        control={control}
        error={errors.gender}
        fieldName="gender"
        placeholder='Gender'
        inputMode={'numeric'}
        mt={20}
        icon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={3}/>}
    /> */}
            <CommonSelectDropdown
                data={genderData}
                control={control}
                fieldName='gender'
                error={errors.gender}
                onchange={changeGender}
                placeholder='Gender'
                leftIcon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={14} marginRight={10} />}
                mt={7}
                height={60}
            />
            {/* <CommonDropdown
        data={genderData}
        value={values}
        control={control}
        error={errors.gender}
        fieldName="gender"
        setValue={setValue}
        placeholder='Gender'
        leftIcon={<Fontisto name='intersex' color='#58D36E' size={25} marginLeft={14} marginRight={10} />}
        mt={7}
        height={60}
    /> */}
            <CommonPicker
                onPress={ImagePicker}
                label={(getValues("image") || selectedImage) ? (
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 13, fontFamily: "Poppins-SemiBold", marginRight: 10, marginLeft: 10 }}>
                            Image Uploaded
                        </Text>
                        <Ionicons name="checkmark-circle" size={20} color={"#58D36E"} />
                    </View>
                ) : 'Upload Photo'}
                icon={<Ionicons name={'cloud-upload'} size={20} color={"#5E59FF"} />}
                mt={5}
                leftIcon={<Entypo name='camera' color='#58D36E' size={23} marginLeft={5} />}
            />

            <CustomButton
                onPress={handleSubmit(formOne)}
                bg='#58D36E'
                label={'Next'}
                mt={25}
            />
        </>
    )
}

export default BasicDetails

const styles = StyleSheet.create({})