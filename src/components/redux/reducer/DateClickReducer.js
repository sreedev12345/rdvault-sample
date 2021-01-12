const dateClickReducer = (state={},action)=>{
    if(action.type === "RECEIVED") {
        console.log("rrrrrrrrrr",action)
        return (
            Object.assign({},{
                status : "SUCCESS",
                data : action.data
            })
        )
    } else {
        return state;
    }
}

export default dateClickReducer;