const getFiltered = (array, filterKey) =>
    array.filter((arrayItem) => {
                return Object.values(arrayItem)
            .filter(key => !!key && !['boolean', 'number', 'object'].includes(typeof key))
            .some(itemString => itemString.toLowerCase().includes(filterKey.toLowerCase()))
    })

export { getFiltered }