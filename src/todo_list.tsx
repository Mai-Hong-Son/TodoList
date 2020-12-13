import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import AddButton from './element/add_button';
import TodoItem from './element/todo_item';
import {AppState} from './redux/reducer';
import SlideFromBottomItem from './element/animations/from_bottom';
import platfrom from './utils/platfrom';

type RootStackParamList = {
    TodoList: undefined;
    AddTodo: undefined;
    EditTodo: undefined;
  };

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TodoList'
>;

export interface Props {
    navigation: ProfileScreenNavigationProp;
}

export interface itemProps {
    id: number,
    title: string,
    content: string,
    deadline?: Date,
    status: string,
}

const TodoList: React.FC<Props> = (props) => {
    const {navigation} = props;
    const dataRedux = useSelector((state: AppState) => state);
    const {todoList} = dataRedux;

    const renderItem = ({ item, index }: { item: itemProps, index: number }) => {
        return <TodoItem onPress={() => navigation.navigate('EditTodo', {todo: item})} index={index} item={item} />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={todoList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={todoList}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => {
                    return (
                        <SlideFromBottomItem
                            renderItem={() => {
                                return (
                                    <AddButton onPress={() => navigation.navigate('AddTodo')} title={'Thêm'} />
                                )
                            }}
                            index={todoList.length}
                            focused={true}
                        />
                    );
                }}
            />

            <View style={{paddingVertical: 20}}>
                <Text style={styles.titleNote}>
                    {'*Chú thích:'}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 8}}>
                    <View style={{width: 15, height: 15, backgroundColor: platfrom.activeColor, borderRadius: 7.5}} />
                    <Text style={{fontSize: 13, paddingLeft: 8}}>{'Đã hoàn thành'}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 8}}>
                    <View style={{width: 15, height: 15, backgroundColor: platfrom.alertColor, borderRadius: 7.5}} />
                    <Text style={{fontSize: 13, paddingLeft: 8}}>{'Chưa hoàn thành'}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'flex-start', marginTop: 8}}>
                    <View style={{width: 15, height: 15, backgroundColor: '#DDA0DD', borderRadius: 7.5}} />
                    <Text style={{fontSize: 13, paddingLeft: 8}}>{'Đang thực hiện'}</Text>
                </View>
            </View>
        </View>
    );
};

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor: '#fff',
    },
    titleNote: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
    },
});