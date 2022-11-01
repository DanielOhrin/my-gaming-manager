import { useEffect, useState } from "react"
import { fetchAPIPlatforms } from "../ApiManager"

export const PlatformsFilter = ({ setPlatformId }) => {
    const [platforms, setPlatforms] = useState([])

    useEffect(() => {
        fetchAPIPlatforms(`fields name; limit 500; sort name asc;`)
            .then(res => res.json())
            .then(data => setPlatforms(data))
    }, [])

    return (
        <div className="flex flex-col w-fit items-center" id="platform">
            <h4 className="mb-1 px-3">Platform</h4>
            <select className="w-1/2" onChange={(evt) => {
                if (parseInt(evt.target.value) === 0) {
                    setPlatformId(undefined)
                } else {
                    setPlatformId(platforms.find(platform => platform.id === parseInt(evt.target.value)).id)
                }
            }}>
                <option value="0">Any</option>
                {
                    platforms.map(platform => {
                        return <option key={`platform--${platform.id}`} value={platform.id}>{platform.name}</option>
                    })
                }
            </select>
        </div >
    )
}