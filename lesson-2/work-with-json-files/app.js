const books = require("./books")

const invokeAction = async ({action, id, title, author}) => {
    switch(action) {
        case "getAll":
            const allBooks = await books.getAll();
            console.log(allBooks);
            break;
        case "getById":
            const oneBook = await books.getById(id);
            console.log(oneBook);
            break;
        case "add":
            const newBook = await books.add({title, author});
            console.log(newBook);
            break;
        case "updateById": 
            const updateBook = await books.updateById(id, {title, author});
            console.log(updateBook);
            break;
        case "removeById":
            const deleteBook = await books.removeById(id);
            console.log(deleteBook)
            break;
        default:
            console.log("Unknown action");
    }
}

// invokeAction({action: "getAll"});
// invokeAction({action: "getById", id: "u9kgwNWGi3uUUwh0b8V48"});
// invokeAction({action: "add", title: "Worm", author: "Джон Маккрей"})
// invokeAction({action: "updateById", id: "yApjcO9g12dwaU4BAlIUg", title: "Ward", author: "Джон Маккрей"})
// invokeAction({action: "removeById", id: "yApjcO9g12dwU4BAlIUg"})