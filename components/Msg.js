import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Msg = (props) => {

    return (
        <View style={styles.styling}>
            <Text style={styles.errorMessage}>{props.text}</Text>
        </View>
    )

}
const styles = StyleSheet.create({
    styling:{
        alignItems: 'center',
    },
    errorMessage:{
        color: '#6E6C6C',
    }
});

export default Msg;