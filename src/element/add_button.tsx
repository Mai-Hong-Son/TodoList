import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import platform from '../utils/platfrom';

export interface Props {
    onPress?: () => void;
    title: string;
    style?: object;
}

const AddButton: React.FC<Props> = (props) => {
    const {onPress, title, style} = props;

    return (
        <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
            <Text style={styles.textButton}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        backgroundColor: platform.activeColor,
        borderRadius: platform.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});