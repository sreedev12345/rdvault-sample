const companyReducer = (state={},action)=>{
    if(action.type === "SUCESS_COMPANY_ACTION") {
        return Object.assign({},state,{
            status : action.status, 
            data : action.data
        })
    } else {
        return state;
    }
}



export default companyReducer;