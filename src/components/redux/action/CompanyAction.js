const companyAction = (data,data1)=>dispatch=>{
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
          data1 : data1
      })  
   )
}

export {companyAction};