export const getBooks = ({books}) => books.items;

export const getFilteredBooks = ({books, filter}) => {
    if(!filter) {
        return books.items;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = books.items.filter(({title, author}) => {
        const normalizedTitle = title.toLowerCase();
        const normalizedAuthor = author.toLowerCase();
        return (normalizedTitle.includes(normalizedFilter) || normalizedAuthor.includes(normalizedFilter))
    });

    return result;
}

export const getFavoriteBooks = ({books}) => {
    const favoriteBooks = books.items.filter(({favorite}) => favorite);
    return favoriteBooks;
};

