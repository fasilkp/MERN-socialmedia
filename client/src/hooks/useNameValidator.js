export const useNameValidator=(name)=>{
    if(name===""){
        return {result:false, message:"username cannot be blank"}
    }
    else if(!isNaN(name[0])){
        return {result:false, message:"username cannot be start with a number"}
    }
    return {result:true}
}