import React from 'react';
import { StyleSheet } from 'react-native';
import { Controller } from "react-hook-form";
import { Box, Text, Select } from 'native-base';

const CommonDropdown = ({ control, name, label, placeholder, error, children, onChangeValue, selectValue, required }) => {
    return (
        <Box w="90%" mb="4">
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Box >
                        <Text color="#000" fontSize="12" fontFamily="Poppins-Regular" mb="2" textAlign="left">{label}<Text color="#FF0000">{required}</Text></Text>
                        <Select
                            placeholder={placeholder}
                            selectedValue={value}
                            defaultValue={selectValue}
                            onValueChange={(value) => {
                                onChange(value)
                                if (onChangeValue) {
                                    onChangeValue(value)
                                }

                            }}
                            rounded="11"
                            bg="#F6F8FF"
                            borderColor="#ABACAF"
                            placeholderTextColor="#b2b2b2"
                            fontFamily="Poppins-Regular"
                            fontSize="12"
                            _actionSheetBody={{ maxToRenderPerBatch: 5, initialNumToRender: 5, removeClippedSubviews: true }}
                        >
                            {children}
                        </Select>
                    </Box>
                )}
                name={name} />
            {error && <Text
                color="#FF0000"
                fontSize="12"
                fontFamily="Poppins-Medium"
                alignSelf="flex-start"
                mt="1">
                {error?.message}
            </Text>}
        </Box>
    )
}

export default CommonDropdown

const styles = StyleSheet.create({})