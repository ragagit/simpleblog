import React from 'react';

export default class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            errorMessage: '',
        };
    }

    componentDidMount(){
        this.getLatestPosts()
    }

    //We are getting the last 20 post from the server
    getLatestPosts(){
        const NUMBER_LATEST_POSTS = -20;
        this.setState({
            posts : { loading: true }
        });
        //service get function and url are passed to the component
        this.props.service.get(this.props.url.url)
             .then( posts => {
                this.setState({ posts: posts.data.slice(NUMBER_LATEST_POSTS) });
            }, error => {
                    this.setState({ errorMessage: 'Unexpected error occurred' });
            });
    }

    render(){
        const { posts, errorMessage } = this.state;
        return(
            <div className="col-md-12" data-testid="postsdiv">
                {errorMessage &&
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                }
                {posts.loading && <em> Loading posts...</em>}
                {posts.length &&
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">Title</th>
                                <th scope="col">Body</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) =>
                                <tr key={post.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{post.userId}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>  
        );
    }
}
