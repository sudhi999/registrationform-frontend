import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify';
import { UilTrashAlt } from '@iconscout/react-unicons'

const Data = (props) => {
    const {rend,handlerend} = props
    const [data,setData] = useState([])
    const handleIcon = (id) => {
      fetch('http://localhost:7000/delete', {
      method: 'DELETE',
      body: JSON.stringify({id : id}),
      headers: {
          'Content-type': 'application/json',
      },
      })
      .then((response) => response.json())
      .then((data) => {
        handlerend(rend)
        toast.success(data.message,{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
        
      })
    }

    useEffect(() => {
      fetch('http://localhost:7000/view')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
      })
    }, [rend]);
  return (
    <>
        <h1 className='mb-5 text-xl font-bold'>View Data</h1>
        <div className='p-5 w-9/10 bg-pink-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-gray-900'>
            <div className='flex w-auto flex-wrap items-center justify-evenly text-left text-xl font-bold'>
                <h1 >Name</h1>
                <h1 >Mobile No</h1>
                <h1 >city</h1>
                <h1 >state</h1>
                <h1>Actions</h1>
            </div>
            <hr className='h-3 bg-black-800' />
            {
              data.map((each) => {
                const {id,fullName,mobileNumber,state,city} = each
                return(
                  <div key={id} className='mb-5 flex align-center flex-wrap w-auto justify-evenly text-left font-normal'>
                    <h1>{fullName}</h1>
                    <h1>{mobileNumber}</h1>
                    <h1>{state}</h1>
                    <h1>{city}</h1>
                    <button onClick={() => handleIcon(id)} >
                      <UilTrashAlt class="transition ease-in-out delay-150  hover:-translate-1 hover:scale-110 hover: duration-300 ..." size="30" color="black" />
                    </button>
                  </div>
                )
              })
            }
        </div>
    </>
  )
}

export default Data


