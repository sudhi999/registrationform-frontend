import react,{ useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import City from "./City";
import { State } from "./stateName";


const RegistrationForm = (props) => {
    const {rend,handlerend} = props

    const [details,setDetails] = useState({Name : "",Number: "",City:"Adilabad",State:"Andhra Pradesh"})
    const {Name,Number} = details
    
    const handleChange = (e) => {
        setDetails({...details,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (Name === ""){
            toast.warn("Enter Valid Name",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else if(Number === ""){
            toast.warn("Enter Valid Phone Number",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            fetch('http://localhost:7000/register', {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Content-type': 'application/json',
                },
                })
                .then((response) => response.json())
                .then((data) => {
                    handlerend(rend)
                    if(data.status){
                        toast.success(data.message,{
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            })
                    }else{
                        throw(e)
                    }
                })
                .catch((err) => {
                    toast.error("Something went wrong",{
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                });
            setDetails({Name : "",Number: "",City:"Adilabad",State:"Andhra Pradesh"})
        }
    }
    return(
        <div className="flex justify-center">
            <div className='h-1/2 w-auto p-10 m-10 bg-pink-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 border border-gray-100'  >
            <div>
                <h1 className="mb-3 font-sans italic font-semibold antialiased text-3xl" >Registration Form</h1>
                <form onSubmit={handleSubmit} type="submit">
                    <input value={Name} onChange={handleChange} name='Name' className="block w-full p-1.5 text-sm font-medium text-gray-900 " type="text" placeholder="Enter Name" /><br/>
                    <input value={Number} onChange={handleChange} name='Number' className="block w-full p-1.5 text-sm font-medium text-gray-900" placeholder="Enter Mobile Number" /><br/>
                    <State details={handleChange} /><br/>
                    <City details={handleChange} /><br/>
                    <button type="submit" className="text-pink-400 hover:text-white border border-pink-400 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-pink-0 dark:text-pink-400 dark:hover:text-white dark:hover:bg-pink-400 dark:focus:ring-pink-100">Register</button>
                </form>
            </div>
            </div>
        </div>
        
    )
}

export default RegistrationForm
