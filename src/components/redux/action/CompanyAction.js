const companyAction = (data)=>dispatch=>{
    console.log("data",data)
   dispatch({
       status : 'PENDING',
       type : 'REQUEST_COMPANY_ACTION'
   }) 
   return(
      dispatch({
          status : 'SUCCESS',
          type : 'SUCESS_COMPANY_ACTION',
          data : data,
      })  
   )
}

export {companyAction};