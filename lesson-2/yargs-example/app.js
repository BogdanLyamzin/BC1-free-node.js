const yargs = require("yargs");
const {hideBin} = require("yargs/helpers")

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

const arr = hideBin(process.argv);
const {argv} = yargs(arr);

invokeAction(argv)