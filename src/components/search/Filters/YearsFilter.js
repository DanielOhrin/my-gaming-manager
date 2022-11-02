export const YearsFilter = ({ apiData, filters, setFilters }) => {
    return (
        <div className="flex flex-col w-fit items-center mx-8" id="years-filter">
            <h4 className="mb-1">Year Released</h4>
            <select className="w-3/5" onChange={(evt) => {
                const copy = { ...filters }

                if (parseInt(evt.target.value) === 0) {
                    copy.year = undefined
                } else {
                    copy.year = apiData.years.find(year => year.id === parseInt(evt.target.value)).label
                }

                setFilters(copy)
            }}>
                <option value="0">Any</option>
                {
                    apiData.years.map(year => {
                        return <option key={`year--${year.id}`} value={year.id}>{year.label}</option>
                    })
                }
            </select>
        </div >
    )
}

