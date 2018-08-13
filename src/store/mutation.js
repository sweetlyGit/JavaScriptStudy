//action 设置修改数据
import * as types from './mutation_type'
export default{
	//demo
    [types.SET_DEMO](state,obj){
        state.demo[obj.num].content = obj.txt;
    },
    [types.DEL_DEMO](state,num){
        state.demo.splice(num-1,1);
    },
    [types.ADD_DEMO](state,obj){
        state.demo.push(obj);
    },
    [types.EDIT_DEMO](state,num){
        state.demo[num].edit = !state.demo[num].edit;
    },
}