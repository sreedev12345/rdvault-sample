const REQUEST_COMPANY_ACTION = 'REQUEST_COMPANY_ACTION';
const SUCESS_COMPANY_ACTION = 'SUCESS_COMPANY_ACTION';
export const companyAction = (data,data1)=>dispatch=>{
    dispatch({
        status : 'PENDING',
        type : REQUEST_COMPANY_ACTION
    }) 
    return(
       dispatch({
           status : 'SUCCESS',
           type : SUCESS_COMPANY_ACTION,
           data : data,
           data1 : data1
       })  
    )
 }

 const companyReducer = (state={},action)=>{
    if(action.type === SUCESS_COMPANY_ACTION) {
        return Object.assign({},state,{
            status : action.status, 
            data : action.data,
            data1 : action.data1
        })
    } 
    else {
        return state;
    }
}

export default companyReducer;

 

 
