export const RatingsFilter = ({ filters, setFilters }) => {
    return (
        <div className="flex flex-col items-center mx-8" id="ratings-filter">
            <h4 className="mb-1">Ratings</h4>
            <select className="w-fit" onChange={(evt) => {
                const copy = { ...filters }

                if (parseInt(evt.target.value) === 0) {
                    copy.ratings = undefined
                } else if (parseInt(evt.target.value) === 1) {
                    copy.ratings = "0-20.9999"
                } else if ([2, 3, 4, 5, 6, 7].includes(parseInt(evt.target.value))) {
                    copy.ratings = `${parseInt(evt.target.value)}1-${parseInt(evt.target.value) + 1}0`
                } else {
                    switch (parseInt(evt.target.value)) {
                        case 8:
                            copy.ratings = "81.0001-89.9999"
                            break
                        case 9:
                            copy.ratings = "90.0001-95.9999"
                            break
                        case 10:
                            copy.ratings = "96.0001-99.9999"
                            break
                        case 11:
                            copy.ratings = "99.00001-100"
                            break
                        default:
                            window.alert('Something went wrong.')

                    }
                }

                setFilters(copy)
            }}>
                <option value="0">Any</option>
                <option value="1">0-20</option>
                <option value="2">21-30</option>
                <option value="3">31-40</option>
                <option value="4">41-50</option>
                <option value="5">51-60</option>
                <option value="6">61-70</option>
                <option value="7">71-80</option>
                <option value="8">81-89</option>
                <option value="9">90-95</option>
                <option value="10">96-99</option>
                <option value="11">100</option>
            </select>
        </div>
    )
}

