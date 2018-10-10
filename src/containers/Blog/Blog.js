import React, {Component} from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        selectedPostId: null,
        posts: [],
        error : false,
        errorMessage : null
    };
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    };
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                //console.log(response);
                const post = response.data.slice(0, 5);
                const updatedPost = post.map(post => {
                        return {
                            ...post,
                            author: 'Max'
                        }
                    }
                );
                this.setState({posts: updatedPost});
            }).catch(error => {
                this.setState({error : true });
                console.log(error);
        });
    }

    render() {

        let posts;
        let index = false ;
        //let errorMessage = null;
        if (this.state.error === true && index === false )
        {
            index = true;
             // this.state.errorMessage =  <p style={{textAlign: 'center' }}>Error toye get dari Kouniiii!</p>
            this.setState ({errorMessage : <p style={{textAlign: 'center' }}>Error toye get dari Kouniiii!</p> })
        }
        else {
            posts = this.state.posts.map(post2 => {
            return <Post key={post2.id} title={post2.title} author={post2.author}
                         clicked={() => this.postSelectedHandler(post2.id)}/>;
        });}


        return (
            <div>
                {this.state.errorMessage}
                <section className="Posts">
                    {posts}
                    {/*<Post />*/}
                </section>
                <section>
                    <FullPost
                        id={this.state.selectedPostId}
                    />
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;
