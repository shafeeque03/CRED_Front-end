import axios from "axios";
const baseURL = "http://localhost:3006";
const myInstance = axios.create({baseURL:baseURL});

export const getUser = async ()=>{
    const data = await myInstance.get('/');
    return data
}

export const addUser = async (userData)=>{
    const data = await myInstance.post('/addUser',{userData});
    return data
}

export const getProduct = async()=>{
    const data = await myInstance.get('/getProducts');
    return data
}

export const addProduct = async (productData)=>{
    const data = await myInstance.post('/addProduct',{productData});
    return data
}

export const editProduct = async (values)=>{
    const data = await myInstance.post('/editProduct',{values});
    return data
}

export const editUser = async (values)=>{
    const data = await myInstance.post('/editUser',{values});
    return data
}