

import { searchPosts } from '../../shared/api/books';

const MyBooksPage = () => {

    return (
        <div className="container">
            <h2>Posts Search Page</h2>
            <PostsSearchForm onSubmit={changeSearch} />
            {items.length > 0 && <PostList items={items} />}
        </div>
    )
}

export default MyBooksPage;