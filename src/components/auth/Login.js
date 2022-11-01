import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchUsers } from "../ApiManager"
import "./Login.css"

export const Login = () => {
    const [email, setEmail] = useState(""),
    [result, setResult] = useState(""),
    navigate = useNavigate()

    useEffect(() => {
        if (result !== "") {
            setTimeout(() => {setResult("")}, 2000)
        }
    }, [result])

    const handleUserInput = (evt) => {
        setEmail(evt.target.value)
    }

    const handleLogin = (evt) => {
        evt.preventDefault()

        document.getElementById("login-btn").disabled = true

        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            //If fetch by email returns object with property "id", then log them in. Otherwise, error message.
            fetchUsers(`?email=${email}`)
                .then(res => res.json())
                .then(userObj => {
                    if (userObj[0] && userObj[0].hasOwnProperty("id")) {
                        setResult("Success!")
                        localStorage.setItem("mgm_user", JSON.stringify({id: userObj[0].id, username: userObj[0].username, isStaff: userObj[0].isStaff}))
                        setTimeout(() => {navigate(`/my-lists/${userObj[0].id}`)}, 2000)
                    } else {
                        setResult("Email not registered!")
                        setTimeout(() => {document.getElementById("login-btn").disabled = false}, 2000)
                    }
                })
        } else {
            setResult("Invalid Email!")
            setTimeout(() => {document.getElementById("login-btn").disabled = false}, 2000)
        }
    }

    return (
        <article className="h-screen flex justify-center items-center">
            <div className={`mr-40 absolute ${result ? "visible" : "invisible"} ${result === "Success!" ? "success" : "failure"}`}>{result}</div>
            <section className="mr-40 mb-40 border-solid shadow-md shadow-inner border bs-4 px-16 py-16">
                <h1 className="w-fit mt-0">Login</h1>
                <form>
                    <fieldset className="border-none flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleUserInput} name="email" type="text" value={email} />
                    </fieldset>
                    <div>
                        <button className="ml-4 pl-5 pr-5" id="login-btn" onClick={handleLogin}>Login</button>
                        <Link className="text-blue underline ml-16" to="/register">Not a member?</Link>
                    </div>
                </form>
            </section>
        </article>
    )
}