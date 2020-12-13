import React, {useState, useEffect} from 'react';
import { TouchableOpacity, StyleSheet, TextInput, View, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import platform from './utils/platfrom';
import AddButton from './element/add_button';
import actions from './redux/actions';
import {itemProps} from './todo_list';

Icon.loadFont();

type RootStackParamList = {
    TodoList: undefined;
    AddTodo: undefined;
    EditTodo: undefined;
  };

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditTodo',
>;

export interface Props {
    navigation: ProfileScreenNavigationProp;
    route?: any;
}

export const showAlertMessage = (title: string, message: string, action?: () => void) => {
    Alert.alert(title, message, [
      {
        text: 'OK',
        onPress: () => {
          if (action) {
            action();
          }
        },
      },
    ]);
  };

const EditTodo: React.FC<Props> = (props) => {
    const {navigation, route} = props;
    const { todo } = route.params;
    const dispatch = useDispatch();
    const editTodo = (todo:itemProps) => dispatch(actions.editTodo(todo));

    const [showDateTime, setShowDateTime] = useState(false);
    const [datePiked, setDatePicked] = useState(todo?.deadline);
    const [title, setTitle] = useState(todo?.title);
    const [content, setContent] = useState(todo?.content);
    const [status, setStatus] = useState(todo?.status);

    const onChangeDeadLine = (selectedDate?: Date) => {

        setShowDateTime(false);
        setDatePicked(selectedDate);
    };

    const showCalendar = () => {
        setShowDateTime(true);
    }

    const hideCalendar = () => {
        setShowDateTime(false);
    }

    const onChangeTitle = (text: string) => {
        setTitle(text);
    };

    const onChangeContent = (text: string) => {
        setContent(text);
    };


    const onAddTodo = () => {
        if (!title) {
            showAlertMessage('Lỗi', 'Bạn chưa nhập tiêu đề');
            return;
        }

        if (!content) {
            showAlertMessage('Lỗi', 'Bạn chưa nhập nội dung');
            return;
        }

        editTodo({
            id: todo?.id,
            title,
            content,
            deadline: datePiked,
            status,
        });

        navigation.goBack();
    };

    const onDone = () => {
        setStatus('done');
    }

    const onNotDone = () => {
        setStatus('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    {'Tiêu đề:'}
                </Text>
                <View style={styles.inputWrapper}>
                    <TextInput value={title} style={styles.textInputStyle} onChangeText={onChangeTitle} />
                </View>
            </View>

            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    {'Nội dung:'}
                </Text>
                <View style={styles.inputAreaWrapper}>
                    <TextInput
                        numberOfLines={10}
                        multiline={true}
                        value={content}
                        style={[styles.textInputStyle, {flex: 1}]}
                        onChangeText={onChangeContent}
                    />
                </View>
            </View>

            <View style={styles.wrapperDealine}>
                <Text style={styles.title}>
                    {'Nhắc nhở:'}
                </Text>
                <View style={styles.textTimeWrapper}>
                    <Text style={styles.textTime}>
                        {datePiked && moment(datePiked).format('DD-MM-YYYY')}
                    </Text>
                </View>
                <TouchableOpacity onPress={showCalendar} style={styles.deadlineButton}>
                    <Icon name="alarm-outline" size={14} color="#fff"/>
                </TouchableOpacity>
            </View>

            <View style={styles.wrapperDealine}>
                <Text style={styles.title}>
                    {'Hoàn thành:'}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        if (status === 'done') {
                            onNotDone();
                        } else {
                            onDone();
                        }
                    }}
                    style={[styles.doneButton, {backgroundColor: status === 'done' ? platform.activeColor : '#fff'}]}>
                    <Icon name="checkmark-outline" size={14} color={status === 'done' ? '#fff' : '#000'}/>
                </TouchableOpacity>
            </View>

            <AddButton
                onPress={onAddTodo}
                title={'Sửa'}
                style={{marginTop: 30}}
            />
            <DateTimePickerModal
                isVisible={showDateTime}
                mode="date"
                onConfirm={onChangeDeadLine}
                onCancel={hideCalendar}
                cancelTextIOS={'Hủy'}
                confirmTextIOS={'Xác nhận'}
                headerTextIOS={'Chọn thời gian'}
            />
        </View>
    );
};

export default EditTodo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    wrapper: {
        width: '100%',
        marginTop: 20,
    },
    wrapperDealine: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    deadlineButton: {
        width: 25,
        height: 25,
        borderRadius: platform.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: platform.activeColor,
        marginTop: 8,
        flexDirection: 'row',
    },
    inputWrapper: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        borderColor: platform.borderColor,
        borderRadius: platform.borderRadius,
        marginTop: 12,
        justifyContent: 'center',
    },
    inputAreaWrapper: {
        height: 150,
        width: '100%',
        borderWidth: 1,
        borderColor: platform.borderColor,
        borderRadius: platform.borderRadius,
        marginTop: 12,
    },
    title: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    textTimeWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: platform.borderColor,
        marginHorizontal: 10
    },
    textTime: {
        width: 120,
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInputStyle: {fontSize: 16, paddingHorizontal: 10},
    doneButton: {
        width: 25,
        height: 25,
        borderRadius: platform.borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: platform.borderColor,
        marginLeft: 10,
    },
});