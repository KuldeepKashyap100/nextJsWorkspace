import PostItem from "./post-item";
import classes from "./posts-grid.module.css";

function PostsGrid(props) {
    const {posts} = props;

    return <div className={classes.grid}>
        {posts.map(post => <PostItem key={post.slug} />)}
    </div>;
}

export default PostsGrid;