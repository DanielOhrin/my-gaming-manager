import { useEffect, useState } from "react"
import { fetchYears } from "../ApiManager"

export const YearsFilter = ({ setYear }) => {
    const [years, setYears] = useState([])

    useEffect(() => {
        fetchYears()
            .then(res => res.json())
            .then(data => setYears(data))
    }, [])

    return (
        <div className="flex flex-col w-fit items-center mr-8" id="year">
            <h4 className="mb-1">Year Released</h4>
            <select className="w-3/5" onChange={(evt) => {
                if (parseInt(evt.target.value) === 0) {
                    setYear(undefined)
                } else {
                    setYear(years.find(year => year.id === parseInt(evt.target.value)).label)
                }
            }}>
                <option value="0">Any</option>
                {
                    years.map(year => {
                        return <option key={`year--${year.id}`} value={year.id}>{year.label}</option>
                    })
                }
            </select>
        </div >
    )
}

