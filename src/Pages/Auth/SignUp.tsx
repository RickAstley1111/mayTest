import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { API } from '../../utils/config'

function SignUp() {
    const navigate = useNavigate()

    useEffect(() =>{
        if(localStorage.getItem("auth")){
            navigate("/homePage")
        }
    },[])

    const [UserData, setUserData] = useState({
        name: "",
        email:"my-email",
        secret: "my-secret",
        key:""
    })

    const inputChange = (el: any) => {
        setUserData({
            ...UserData, [el.target.name]: el.target.value
        })
        console.log(UserData);

    }

    const handleRegister = () => {
        API.post("/signup", UserData).then((res) => {
            localStorage.setItem("auth", "true")
            localStorage.setItem("key" , res.data.data.key)
            localStorage.setItem("secret" , res.data.data.secret)
            localStorage.setItem("user" , JSON.stringify(res.data.data))
            navigate("/homePage")
            toast.success("entered succesfuly")
        })

    }

    return (
        <div className="SignUpPage">
            <div className="SignUpContent">

                <div>
                    <h1 className="SignUpTitle">Sign Up</h1>

                    <div className="SignUpInputs">
                        <div>
                            <span>Name</span>
                            <input name='name' onChange={(el: any) => inputChange(el)} placeholder="name" type="text" />
                        </div>

                        <div>
                            <span>Enter Password</span>
                            <input name='key' onChange={(el: any) => inputChange(el)} placeholder="password" type="password" />
                        </div>

                    </div>

                    <div className="lowerSignUp">
                        <button onClick={handleRegister} className="sumbitBtn">
                            Sumbit
                        </button>
                        <p>Already signed up? <Link to={"/SignIn"}>go to sign in</Link></p>
                    </div>


                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp