export const Sort = ({ setSort }) => {
    const handleSortChange = (evt) => {
        const selects = [document.getElementsByName("rating")[0], document.getElementsByName("year")[0], document.getElementsByName("name")[0]]

        if (evt.target.value === "0") {
            setSort("")
            selects.forEach(select => select.disabled = false)
            return
        } else {
            selects.forEach(select => select.value === "0" ? select.disabled = true : select.disabled = false)
        }

        switch (evt.target.name) {
            case "rating":
                evt.target.value === "1"
                    ? setSort('total_rating-asc')
                    : setSort('total_rating-desc')
                break
            case "year":
                evt.target.value === "1"
                    ? setSort('first_release_date-asc')
                    : setSort('first_release_date-desc')
                break
            case "name":
                evt.target.value === "1"
                    ? setSort('name-asc')
                    : setSort('name-desc')
                break
            default:
                window.alert('Something went wrong.')
        }
    }

    return (
        <div className="pb-1 flex items-center justify-evenly flex-wrap w-1/2 bg-gray-200 shadow-md rounded-br-xl">
            <h5 className="w-full mb-0 mt-2 ml-4 text-gray-700">Sort Games</h5>
            <div className="flex flex-col items-center">
                <label className="font-bold" htmlFor="rating">Ratings</label>
                <select className="select-sort w-28" name="rating" onChange={handleSortChange}>
                    <option value="0">None</option>
                    <option value="1">Low to High</option>
                    <option value="2">High to Low</option>
                </select>
            </div>
            <div className="flex flex-col items-center">
                <label className="font-bold" htmlFor="year">Year</label>
                <select className="select-sort w-28" name="year" onChange={handleSortChange}>
                    <option value="0">None</option>
                    <option value="1">Old to New</option>
                    <option value="2">New to Old</option>
                </select>
            </div>
            <div className="flex flex-col items-center">
                <label className="font-bold" htmlFor="Name">Name</label>
                <select className="select-sort w-28" name="name" onChange={handleSortChange}>
                    <option value="0">None</option>
                    <option value="1">{`A -> Z`}</option>
                    <option value="2">{`Z -> A`}</option>
                </select>
            </div>
        </div>
    )
}