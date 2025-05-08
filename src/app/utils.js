

export const loadState = ()=>{
    try{
        let data =  localStorage.getItem("state");
        if(!data){
            return undefined 
        }
        return JSON.parse(data);

    }catch(error){
        console.error("error while loading state", error);
    }
}

export const saveState = (state)=>{
    try{
       localStorage.setItem("state",JSON.stringify(state))
    }catch(error){
        console.error("error while saving state", error);
    }
}