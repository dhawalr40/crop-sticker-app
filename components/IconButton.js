import {StyleSheet, View, Pressable, Text} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

export default function IconButton({icon, label, onPress}){
    return(
        <Pressable style={styles.container} onPress={onPress}>
            <MaterialIcons name={icon} size={32} color="white" />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    },
});