import { useEffect, useState } from "react"
import { fetchAPIGenres, fetchAPIPlatforms, fetchAPIThemes, fetchYears } from "../../ApiManager"
import { YearsFilter } from "./YearsFilter"
import { PlatformsFilter } from "./PlatformsFilter"
import { RatingsFilter } from "./RatingsFilter"
import { GenresFilter } from "./GenresFilter"
import { ThemesFilter } from "./ThemesFilter"

export const Filters = ({ filters, setFilters }) => {
    const [apiData, setApiData] = useState({
        platforms: [],
        genres: [],
        themes: [],
        years: []
    })

    useEffect(() => {
        const copy = { ...apiData }

        Promise.all([
            fetchAPIPlatforms(`fields name; limit 500; sort name asc;`)
                .then(res => res.json())
                .then(data => copy.platforms = data),
            fetchAPIGenres(`fields name; limit 500; sort name asc;`)
                .then(res => res.json())
                .then(data => copy.genres = data),
            fetchAPIThemes(`fields name; limit 500; sort name asc;`)
                .then(res => res.json())
                .then(data => copy.themes = data),
            fetchYears()
                .then(res => res.json())
                .then(data => copy.years = data)
        ])
            .then(() => setApiData(copy))
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <YearsFilter apiData={apiData} filters={filters} setFilters={setFilters} />
            <PlatformsFilter apiData={apiData} filters={filters} setFilters={setFilters} />
            <GenresFilter apiData={apiData} filters={filters} setFilters={setFilters} />
            <ThemesFilter apiData={apiData} filters={filters} setFilters={setFilters} />
            <RatingsFilter filters={filters} setFilters={setFilters} />
        </>
    )
}
