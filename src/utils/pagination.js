//Pagination
module.exports = function getPagination(page, size){
    const limit = size ? +size : 3
    const offset = page ? page * limit : 0
    return { limit, offset }
}

module.exports = function getPaginationData(data, page, limit){
    console.log("Data Paginacion: ",data)
    const { count: totalItems, rows: notes} = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
    return { totalItems, notes, totalPages, currentPage}
}