import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchUsers } from "../ApiManager"

export const Profile = () => {
    const { userId } = useParams(),
        [userObj, setUserObj] = useState({}),
        [backupUserObj, setBackupUserObj] = useState({}),
        [info, setInfo] = useState([]),
        [editing, setEditing] = useState(false)

    useEffect(() => {
        fetchUsers(`/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUserObj(data)
                setBackupUserObj(data)
            })

        setInfo(["email", "name", "username", "phone", "dateCreated"])
    }, [userId])

    const handleUserInput = (evt) => {
        const copy = { ...backupUserObj }
        copy[evt.target.name] = evt.target.value

        setBackupUserObj(copy)
    }

    const cancelChanges = () => {
        setEditing(false)
        setBackupUserObj(userObj)
    }

    const saveChanges = async () => {
        const buttons = document.getElementsByName("btn")
        buttons.forEach(button => button.disabled = true)

        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(backupUserObj.email)) {
            // Conditionals to check whether the user entered a phone #, and if that # is valid or not.
            if (backupUserObj.phone.length === 12 && backupUserObj.phone.replaceAll(" ", "") !== "") { // RegEx test to ensure a uniform format
                if (!/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})$/.test(backupUserObj.phone)) {
                    window.alert("Invalid Phone #")
                    buttons.forEach(button => button.disabled = false)
                    return
                }
            } else if (backupUserObj.phone.replaceAll(" ", "").length > 0) {
                window.alert("Remove characters from Phone or enter a valid Phone #.")
                buttons.forEach(button => button.disabled = false)
                return
            }
            //! -------------------------------Conditionals--------------------------------
            const checkEmail = await fetchUsers(`?email=${backupUserObj.email}`)
            const emailRes = await checkEmail.json()

            if (userObj.email !== backupUserObj.email && (emailRes.length && emailRes[0].id !== userObj.id)) {
                window.alert(`Email already registered.`)
                buttons.forEach(button => button.disabled = false)
                return
            }
            //! -------------------------------Conditionals--------------------------------
            const checkUsername = await fetchUsers(`?username=${backupUserObj.username}`)
            const usernameRes = await checkUsername.json()

            if (userObj.username !== backupUserObj.username && (usernameRes.length && usernameRes[0].id !== userObj.id)) {
                window.alert(`Username is taken.`)
                buttons.forEach(button => button.disabled = false)
                return
            }
            //* -------------------------------Runs below code if above rules are met--------------------------------
            fetchUsers(`/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(backupUserObj)
            })
                .then(res => {
                    if (res.ok) {
                        window.alert("Success!")

                        // Update State
                        fetchUsers(`/${userId}`)
                            .then(res => res.json())
                            .then(data => {
                                setUserObj(data)
                                setBackupUserObj(data)
                                setEditing(false)
                            })
                    } else {
                        window.alert("Changes failed to save.")
                        buttons.forEach(button => button.disabled = false)
                    }
                })
        } else {
            window.alert('Invalid Email Address.')
            buttons.forEach(button => button.disabled = false)
        }
    }

    return (
        <article className="flex w-full fixed h-screen justify-center items-center">
            <section className="flex flex-col items-center w-96 h-96 border-solid px-10 pb-2 mb-40">
                <h1>Account Info</h1>
                <div className="w-full h-80 flex flex-col items-start justify-between">
                    {
                        userObj
                            ? editing
                                ? info.map(key => {
                                    if (!(key === "dateCreated")) {
                                        let keyDisplay = Array.from(key)
                                        keyDisplay = keyDisplay[0].toUpperCase() + keyDisplay.splice(1).join("")

                                        return (
                                            <div key={`inputDiv--${info.indexOf(key)}`} className="w-full">
                                                <div>{keyDisplay}</div>
                                                {
                                                    key === "phone"
                                                        ? <input type="text" name={key} className="text-opacity-25 p-0.5 text-base border-solid w-full border"
                                                            value={backupUserObj[key]}
                                                            onChange={handleUserInput}
                                                            placeholder="000-000-0000" />
                                                        : <input type="text" name={key} className="text-opacity-25 p-0.5 text-base border-solid w-full border"
                                                            value={backupUserObj[key]}
                                                            onChange={handleUserInput} />

                                                }

                                            </div>
                                        )
                                    } else {
                                        return ""
                                    }
                                })
                                : info.map(key => {
                                    let keyDisplay = Array.from(key)
                                    keyDisplay = keyDisplay[0].toUpperCase() + keyDisplay.splice(1).join("")

                                    if (key === "dateCreated") {
                                        keyDisplay = "Date Created"
                                    }

                                    return (
                                        <div key={`infoDiv--${info.indexOf(key)}`} className="w-full">
                                            <div>{keyDisplay}</div>
                                            {
                                                userObj[key]
                                                    ? <div className="font-thin p-0.5 border-solid w-full border">{userObj[key]}</div>
                                                    : <div className="font-thin p-0.5 border-solid w-full border">- N / A -</div>
                                            }
                                        </div>
                                    )
                                })
                            : ""
                    }
                </div>
                <div className="mt-1 flex w-full">
                    {
                        !editing
                            ? <button onClick={() =>
                                setEditing(true)
                            }>Edit Profile</button>
                            : (
                                <div className="flex w-full justify-between">
                                    <button name="btn" onClick={cancelChanges}>Cancel</button>
                                    <button name="btn" onClick={saveChanges}>Save Changes</button>
                                </div>
                            )
                    }
                </div>
            </section>
        </article>
    )
}