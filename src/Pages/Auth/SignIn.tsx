import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API } from "../../utils/config"
import { toast, ToastContainer } from 'react-toastify'

function SignIn() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("auth")) {
            navigate("/homePage")
        }
    }, [])

    const [UserData, setUserData] = useState({
        name: "My-name",
        secret: "my-secret",
        key: "KakaKey",
        email:"zorEmail.com"
    })

    const inputChange = (el: any) => {
        setUserData({
            ...UserData, [el.target.name]: el.target.value
        })
        console.log(UserData);

    }

    const handleLogin = async () => {
         try {
            await API.post("/signup", UserData).then((res: any) => {
                localStorage.setItem("key", res.data.data.key);
                localStorage.setItem("secret", res.data.data.secret);
                localStorage.setItem("user", JSON.stringify(res.data.data))
                localStorage.setItem("auth", "true");
                console.log(res.data);

                navigate("/homePage");
            })

            toast.success("logged in succesfuly")
        }
        catch (err) {
        toast.error("your username or password is incorrect")
        }
    }

    return (
        <div className="SignUpPage">
            <div className="SignUpContent">

                <div>
                    <h1 className="SignUpTitle">Sign In</h1>

                    <div className="SignUpInputs">
                        <div>
                            <span>Usesrname</span>
                            <input name='name' onChange={(el: any) => inputChange(el)} placeholder="Enter username" type="text" />
                        </div>

                        <div>
                            <span>Enter Password</span>
                            <input name='key' onChange={(el: any) => inputChange(el)} placeholder="password" type="password" />
                        </div>

                    </div>

                    <div className="lowerSignUp">
                        <button onClick={handleLogin} className="sumbitBtn">
                            Sumbit
                        </button>
                        <p>Dont have an account? <Link to={"/SignUp"}>go to sign up</Link></p>
                    </div>


                </div>
            </div>
             <ToastContainer  />
        </div>
    )
}

export default SignIn