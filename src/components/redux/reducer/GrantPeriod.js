const grantPeriod = (state={},action)=>{
    console.log("grant-period",action)
    if(action.type === 'GRANT_SUCCESS') {
        return Object.assign({},state,{
            status : action.status,
            data : action.data
        })
    } else {
        return state;
    }
}

export default grantPeriod;