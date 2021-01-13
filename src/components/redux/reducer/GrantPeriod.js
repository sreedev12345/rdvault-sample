const grantPeriod = (state={},action)=>{
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