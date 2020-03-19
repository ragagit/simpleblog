import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from './pages/home/home.page';
import PostPage from './pages/post/post.page';
import Footer from './footer/footer'
import AxBlogService from './services/blog.service'

import {
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const servget = { get: AxBlogService.axget }
const servurl = { url: AxBlogService.API_URL}
const servpost = { post: AxBlogService.axpost }

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
    };
  }

  render() {
    const { history } = this.state;
    return (
      <>
        <main role='main' className='flex-shrink-0'>
          <Router history={history}>
            <header>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
                <a className="navbar-brand" href="/#">
                  <img src={logo} className="App-logo" alt="logo" />
                  React
                </a>
                <div className="navbar-nav mr-auto">
                  <Link to="/home" className="nav-item nav-link">
                    <FontAwesomeIcon icon={faHome} /> Home
                  </Link>
                  <Link to="/post" className="nav-item nav-link">
                    Post
                  </Link>
                </div>
              </nav>
            </header>
            <div>
              <div className="container">
                <Switch>
                  <Route exact path="/">
                    <HomePage url={servurl} service={servget} />
                  </Route>
                  <Route exact path="/home">
                    <HomePage url={servurl} service={servget} />
                  </Route>
                  <Route exact path="/post">
                    <PostPage url={servurl} service={servpost} />
                  </Route>
                </Switch>
              </div>
            </div>
          </Router>
          <Footer />
        </main>
      </>
    )
  }
}

