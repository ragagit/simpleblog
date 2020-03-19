import HomePage from './home.page';
import { create } from "react-test-renderer";
import React from 'react'
import { render, screen } from '@testing-library/react'
import AxBlogService from '../../services/blog.service'

describe("HomePage component test suit", () => {

    const posts = {
        "data": [
            { id: "1", userId: "1", title: "My post", body: "Some comments" },
            { id: "2", userId: "1", title: "My post", body: "Some comments" },
            { id: "3", userId: "1", title: "My post", body: "Some comments" }
        ]
    }
    const getSuccess = {
        get: jest.fn(() => Promise.resolve(posts)),
    }
    const getFailure = {
        get: jest.fn(() => Promise.reject(new Error())),
    }
    const url = { url: AxBlogService.API_URL }
    test("Loading data", () => {
        const component = create(<HomePage url={url} service={getSuccess} />)
        const instance = component.getInstance();
        expect(instance.state.posts.loading).toBeTruthy();
    })
    test("Loading message", async () => {
        render(<HomePage url={url} service={getFailure} />)
        const msg = await screen.findByTestId('postsdiv')
        expect(msg).toHaveTextContent('Loading posts...');
    })

    test("Initial no error message", () => {
        const component = create(<HomePage url={url} service={getSuccess}/>)
        const instance = component.getInstance();
        expect(instance.state.errorMessage).toBe("");
    })
    test("Showing posts success", async () => {
        render(<HomePage url={url} service={getSuccess}/>)
        const posts = await screen.findByTestId('postsdiv')
        expect(posts).toHaveTextContent('My post');
    })
    test("Showing posts error", async () => {
        render(<HomePage url={url} service={getFailure} />)
        const error = await screen.findByTestId('postsdiv')
        expect(error).toHaveTextContent('Unexpected error occurred');       
    })
})
