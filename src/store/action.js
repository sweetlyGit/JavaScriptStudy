//action 设置修改数据
import * as types from './mutation_type'
export default{
	//demo
    setDemo({commit},obj){
        commit(types.SET_DEMO,obj);
    },
    delDemo({commit},num){
        commit(types.DEL_DEMO,num);
    },
    addDemo({commit},obj){
        commit(types.ADD_DEMO,obj);
    },
    editDemo({commit},num){
        commit(types.EDIT_DEMO,num);
    },
}