// Save extracted filters to local storage
export const saveFilterValuesToLocalStorage = (sources, categories, authors) => {
    localStorage.setItem("allSources", JSON.stringify(sources))
    localStorage.setItem("allCategories", JSON.stringify(categories))
    localStorage.setItem("allAuthors", JSON.stringify(authors))
}