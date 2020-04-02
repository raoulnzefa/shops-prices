const filteringHelper = (data, selectedFilters) => {
  return data.filter(product => {
    if (
      selectedFilters.some(elem => product.name.toLowerCase()
        .includes(elem.toLowerCase()))
    ) {
      return false
    }
    return true
  })
}

export default filteringHelper