import defaultPosts from '@/assets/data.json';

const STORAGE_KEY = 'posts';
function storePosts(posts: Post[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getPosts(): Post[] {
    const storedPosts = localStorage.getItem(STORAGE_KEY);
    if (storedPosts) {
        return JSON.parse(storedPosts);
    }
    return [];
}

function getPostById(id: number): Post | null {
    const posts = getPosts();
    return posts.find(post => post.id === id) || null;
}


function removePost(id: number): void {

    const posts = getPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    storePosts(updatedPosts);

}

function editPost(updatedPost: Post): void {
    const posts = getPosts();
    const postIndex = posts.findIndex(post => post.id === updatedPost.id);
    if (postIndex !== -1) {
        posts[postIndex] = updatedPost;
        storePosts(posts);
    }
}

function initializeStorageIfEmpty(force = false): void
{
    if (force)
    {
        console.log("Forcing initialization of storage");
        localStorage.removeItem(STORAGE_KEY);
    }

    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
    }

}

export function addPost(newPost: Post): void {
    const posts = getPosts();
    const highestId = posts.length > 0 ? Math.max(...posts.map(post => post.id)) : 0;
    newPost.id = highestId + 1;
    posts.push(newPost);
    storePosts(posts);
}

function resetPosts(): void
{
    initializeStorageIfEmpty(true);
}
initializeStorageIfEmpty();


export { storePosts, getPosts, getPostById, editPost, resetPosts, removePost };