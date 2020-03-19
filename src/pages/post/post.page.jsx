import React from 'react';
import { Blog } from '../../models/blog';

export default class PostPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            blog: new Blog('', '', ''),
            loading: true,
            errorMessage: '',
            infoMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    //This functions handles any change in body and title fields
    handleChange(e) {
        this.setState({ loading: true, infoMessage: '' });
        let { name, value } = e.target;
        let blog = this.state.blog;
        blog[name] = value;
        this.setState({ blog: blog }); 
        if( this.state.blog.title.length !== 0 &&
            this.state.blog.body.length !== 0 ){
                this.setState({ loading: false})
            } 
    }

    //This function sends a post request to the url specified
    handlePost(e){
        e.preventDefault();
        let { blog } = this.state;
        blog['userId'] = '1';
        this.setState({ loading: true });
        //service post function and url are passed to the component
        this.props.service.post(this.props.url.url, blog) 
            .then( data => {
                this.setState({
                    loading: false,
                    infoMessage: 'Your post was sent successfully.'
                }); 
        })
        .catch( error => {
                this.setState({ 
                    errorMessage: 'An error has occurred sending your post. ' + error,
                    loading: false
                });                          
        });
    }

    render(){
        const { blog, loading, errorMessage, infoMessage } = this.state;
        return(       
            <div className="container h-100" data-testid="sendpostdiv">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <br/><br/><br/><br/><h3>Post</h3>
                        <hr />
                        <form name="form" onSubmit={(e) => this.handlePost(e)}>
                            <div className="form-group" data-testid="titlereq">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" data-testid="title" name="title" placeholder="Title ..." value={blog.title} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Message</label>
                                <textarea className="form-control" data-testid="body" name="body" placeholder="Message ..." value={blog.body} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-secondary btn-md" data-testid="sendbtn" disabled={loading}>Send</button>
                            </div>
                        </form> 
                        {errorMessage &&
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        }
                        {infoMessage &&
                            <div className="alert alert-success" role="alert">
                                {infoMessage}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}