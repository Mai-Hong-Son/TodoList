import React, {useRef} from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import ActionSheet from 'react-native-actionsheet';
import { useSelector, useDispatch } from 'react-redux';

import platform from '../utils/platfrom';
import {itemProps} from '../todo_list';
import actions from '../redux/actions';
import SlideFromBottomItem from '../element/animations/from_bottom';

export interface Props {
    item: {
        id: number,
        title: string,
        content: string,
        deadline?: Date,
        status: string,
    };
    index: number;
    onPress?: () => void;
}

const TodoItem: React.FC<Props> = (props) => {
    const actionSheetRef = useRef();
    const dispatch = useDispatch();
    const removeTodo = (id:number) => dispatch(actions.removeTodo(id));
    const {index, item, onPress} = props;
    const {title, content, deadline, status} = item;
    const currentDate = new Date().getTime();
    const todoDeadLine = deadline ? moment(deadline).format('x') : currentDate + 1;

    const getBackroundColor = () => {
        if (status === 'done') {
            return platform.activeColor;
        } else if (currentDate > todoDeadLine) {
            return platform.alertColor;
        }

        return '#DDA0DD';
    };

    const onDelete = (index: number) => {
        if (index === 0) {
            removeTodo(item?.id);
        }
    };
    

    return (
        <SlideFromBottomItem
            renderItem={() => {
                return (
                    <>
                <TouchableOpacity onLongPress={() => actionSheetRef?.current?.show()} onPress={onPress} style={[{backgroundColor: getBackroundColor()},styles.container]}>
                    <View style={styles.boxWrapper}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.content} numberOfLines={1}>{content}</Text>
                        {deadline && (
                            <Text style={styles.deadline} numberOfLines={1}>{deadline && moment(deadline).format('DD-MM-YYYY')}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <ActionSheet
                    ref={actionSheetRef}
                    title={'Bạn có muốn xóa?'}
                    options={['Xóa', 'Hủy']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={onDelete}
                />
            </>
                )
            }}
            index={index}
            focused={true}
        />
    );
};

export default TodoItem ;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        borderRadius: platform.borderRadius,
        marginBottom: 12,
    },
    boxWrapper: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        fontSize: 13,
        color: '#fff',
    },
    deadline: {
        fontSize: 14,
        color: '#fff',
    },
});