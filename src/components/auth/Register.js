import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchUsers } from "../ApiManager"
import "./Login.css"

export const Register = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        name: "",
        username: "",
        phone: ""
    }),
        [result, setResult] = useState(""),
        navigate = useNavigate()

    useEffect(() => {
        if (result !== "") {
            setTimeout(() => { setResult("") }, 2000)
        }
    }, [result])

    const handleUserInput = (evt) => {
        const copy = { ...userInfo }
        copy[evt.target.name] = evt.target.value

        setUserInfo(copy)
    }

    const handleRegister = (evt) => {
        evt.preventDefault()
        document.getElementById("register-btn").disabled = true

        let emptyInputs = 0

        // Adds 1 to emptyInputs when the conditions are met 
        Object.values(userInfo).forEach(value => {
            if (value === "" || value.replaceAll(" ", "") === "") {
                emptyInputs++
            }
        })

        if ((userInfo.phone.replaceAll(" ", "") !== "" && emptyInputs > 0) || (userInfo.phone.replaceAll(" ", "") === "" && emptyInputs > 1)) {
            window.alert(`Please fill out the required fields.`)
            document.getElementById("register-btn").disabled = false;
            return
        }

        // Conditionals to check whether the user entered a phone #, and if that # is valid or not.
        if (userInfo.phone.length === 12 && userInfo.phone.replaceAll(" ", "") !== "") { // RegEx test to ensure a uniform format
            if (!/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/.test(userInfo.phone)) {
                window.alert("Invalid Phone #")
                document.getElementById("register-btn").disabled = false
                return
            }
        } else if (userInfo.phone.replaceAll(" ", "").length > 0) {
            window.alert("Remove characters from Phone or enter a valid Phone #.")
            document.getElementById("register-btn").disabled = false
            return
        }

        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)) {
            // Check for resource with that email already in database
            fetchUsers(`?email=${userInfo.email}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.length > 0) {
                        //Implement a fetch to post their information to users, then redirect them to "My Lists" page
                        fetchUsers("/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                ...userInfo,
                                dateCreated: Date.now()
                            })
                        })
                            .then(res => res.json())
                            .then(createdUser => {
                                if (createdUser.hasOwnProperty("id")) {
                                    localStorage.setItem("mgm_user", JSON.stringify({ id: createdUser.id, username: createdUser.username }))

                                    setResult("Success!")

                                    setTimeout(() => { navigate(`/my-lists/${createdUser.id}`) }, 2000)
                                } else {
                                    setResult("Error creating account!")
                                    setTimeout(() => { document.getElementById("register-btn").disabled = false }, 2000)
                                }
                            })
                    } else {
                        setResult("Email already registered!")
                        setTimeout(() => { document.getElementById("register-btn").disabled = false }, 2000)
                    }
                })
        } else {
            setResult("Invalid email address!")
            setTimeout(() => { document.getElementById("register-btn").disabled = false }, 2000)
        }
    }

    return (
        <article className="h-screen flex justify-center items-center">
            <div className={`mr-40 absolute ${result ? "visible" : "invisible"} ${result === "Success!" ? "success" : "failure"}`}>{result}</div>
            <section className="mr-40 mb-40 mt-10 border-solid shadow-md shadow-inner border bs-4 px-16 py-16">
                <h1 className="w-fit mt-0">Register</h1>
                <form>
                    <fieldset className="border-none flex flex-col">
                        <label htmlFor="email">Email<strong>*</strong></label>
                        <input name="email" type="text" onChange={handleUserInput} value={userInfo.email} />
                    </fieldset>
                    <fieldset className="border-none flex flex-col">
                        <label htmlFor="name">Name<strong>*</strong></label>
                        <input name="name" type="text" onChange={handleUserInput} value={userInfo.name} placeholder="First and Last" />
                    </fieldset>
                    <fieldset className="border-none flex flex-col">
                        <label htmlFor="username">Username<strong>*</strong></label>
                        <input name="username" type="text" onChange={handleUserInput} value={userInfo.username} />
                    </fieldset>
                    <fieldset className="border-none flex flex-col">
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" type="text" onChange={handleUserInput} value={userInfo.phone} placeholder="000-000-0000" />
                    </fieldset>
                    <div>
                        <button className="ml-4 pl-5 pr-5" id="register-btn" onClick={handleRegister}>Register</button>
                        <Link className="text-blue underline ml-16" to="/login">Have an account?</Link>
                    </div>
                </form>
            </section>
        </article>
    )
}