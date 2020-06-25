module.exports = (currentPage, perPage, total) => {
    const getNumOfPage = () => {
        return total % perPage === 0 ? total / perPage : Math.floor(total / perPage) + 1;
    };

    return {
        total,
        perPage,
        currentPage: currentPage > getNumOfPage() ? 1 : currentPage,
        numOfPage: total % perPage === 0 ? total / perPage : Math.floor(total / perPage) + 1,
        nextPage: currentPage < this.numOfPage ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        testThis: getNumOfPage(),
    };
};
