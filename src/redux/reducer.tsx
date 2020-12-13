import { combineReducers } from 'redux';

export interface itemProps {
    id: number,
    title: string,
    content: string,
    deadline?: Date,
    status: string,
}
 
export interface actionProps {
    type: string;
    payload: any;
}

const initData:Array<itemProps> = [
    {
        id: 1,
        title: 'Test',
        content: 'Test',
        deadline: new Date(),
        status: 'failed',
    }
];
 
const todoList = (state = initData, action: actionProps) => {
  switch (action.type) {
    case 'demo/add_todo':
        return [...state,action.payload];
    case 'demo/edit_todo':
        const {id} = action.payload;
        const newArray = state.filter(e => e.id !== id);
    
        return [...newArray,action.payload];
    case 'demo/remove_todo':
        const deleteArray = state.filter(e => e.id !== action.payload);
    
        return deleteArray;
    default:
        return state;
  }
};

const rootReducer = combineReducers({
    todoList,
});

export type AppState = ReturnType<typeof rootReducer>
 
export default rootReducer;