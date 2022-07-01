import './App.css';
import PostsAPI from '../api/posts.api';

function App() {
  PostsAPI.getPosts()
    .then(response => console.log(response.data));

  return (
    <h1>APP</h1>
  );
}

export default App;
