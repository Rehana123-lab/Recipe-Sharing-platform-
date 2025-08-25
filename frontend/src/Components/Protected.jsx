import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Protected = ({token}) => {
    const [data,setData]=useState(null)
    const fetchData=async() =>{
        try{
            const res =await axios.get('http://localhost:3002/protected/data',{
                headers:{Authorization:`Bearer ${token}`},
            })
            setData(res.data)
        }catch(err){
            setData({error:err.response?.data?.error ||'Error fetching data'})
        }
    }


  return (
    <div>
     <button onClick={fetchData}>Get Protected data</button>
        <pre>{JSON.stringify(data,null,2)}</pre>
   
    </div>
  )
}

export default Protected
