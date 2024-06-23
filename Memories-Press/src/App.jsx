import React, { useEffect, useState } from 'react';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const revPost = posts.reverse();
    useEffect(() => {
        fetch('http://memories-press/wp-json/wp/v2/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => setPosts(data))
            .catch(error => setError(error.toString()));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default App;
