const grantPeriod = (state={},action)=>{
    console.log("grant-period",action,action.type)
    if(action.type === 'GRANT_SUCCESS') {
        return Object.assign({},state,{
            status : action.status,
            data : action.data,
            yes:action.yes
        })
    } else {
        return state;
    }
}

export default grantPeriod;