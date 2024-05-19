export async function fetchAvailablePlaces(){
    const response = await fetch("http://localhost:3000/places");
    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    return resData.places;
}
export async function fetchUserePlaces(){
    const response = await fetch("http://localhost:3000/user-places");
    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch user places");
    }
    return resData.places;
}

//update user places 
export async function updateUserPlace(places){
   const response =await fetch("http://localhost:3000/user-places",{
        method : 'PUT',
        body: JSON.stringify({places : places}),
        headers :{
            'Content-Type' : 'application/json'
        }
    });
    const resData = await response.json();
    if(!response.ok){
        throw new Error("Failed to update user data");
    }
    return resData.message;
}