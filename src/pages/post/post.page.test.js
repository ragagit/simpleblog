import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from "react-test-renderer";
import  PostPage  from './post.page'
import AxBlogService from '../../services/blog.service'

describe("PostPage test suit", () => {

    const postSuccess = {
        post: jest.fn(() => Promise.resolve({ status : "201" })),
    }
    const postFailure = {
        post: jest.fn(() => Promise.reject({ status: "Post error" } ) ),
    }
    const url = { url: AxBlogService.API_URL }

    test("Title state", () => {
        const component = create(<PostPage url={url} service={postSuccess}/>);
        const instance = component.getInstance();
        expect(instance.state.blog.title.length).toBe(0);
    })
    test("Body state", () => {
        const component = create(<PostPage url={url} service={postSuccess} />);
        const instance = component.getInstance();
        expect(instance.state.blog.body.length).toBe(0);
    })
    test("Title field input", () => {
        render(<PostPage url={url} service={postSuccess}/>)
        const titleInput = screen.getByTestId("title");
        const title = "Title1";
        fireEvent.change(titleInput, {target: {name: "title", value: title}})
        expect(titleInput.value).toEqual(title);
    })
    test("Body field input", () => {
        render(<PostPage url={url} service={postSuccess}/>)
        const bodyInput = screen.getByTestId("body");
        const body = "Body1";
        fireEvent.change(bodyInput, { target: { name: "body", value: body } })
        expect(bodyInput.value).toEqual(body);
    })
    test("Sending a post succeeds", async () => {
        render(<PostPage url={url} service={postSuccess} />)
        const titleInput = screen.getByTestId("title");
        const title = "Title1";
        const bodyInput = screen.getByTestId("body");
        const body = "Body1";
        fireEvent.change(titleInput, { target: { name: "title", value: title } })
        fireEvent.change(bodyInput, { target: { name: "body", value: body } })
        fireEvent.click(screen.getByTestId("sendbtn"))
        expect(postSuccess.post).toHaveBeenCalledTimes(1);
        const posts = await screen.findByTestId('sendpostdiv')
        expect(posts).toHaveTextContent('Your post was sent successfully.');
    })
    test("Sending a post fails", async () => {
        render(<PostPage url={url} service={postFailure} />)
        const titleInput = screen.getByTestId("title");
        const title = "Title1";
        const bodyInput = screen.getByTestId("body");
        const body = "Body1";
        fireEvent.change(titleInput, { target: { name: "title", value: title } })
        fireEvent.change(bodyInput, { target: { name: "body", value: body } })
        fireEvent.click(screen.getByTestId("sendbtn"))        
        expect(postFailure.post).toHaveBeenCalledTimes(1);
        const posts = await screen.findByTestId('sendpostdiv')
        expect(posts).toHaveTextContent('An error has occurred sending your post.');
    })
    test("Button enabled", () => {
        const { getByText } = render(<PostPage url={url} service={postSuccess} />)
        const titleInput = screen.getByTestId("title");
        const title = "Title1";
        const bodyInput = screen.getByTestId("body");
        const body = "Body1";   
        fireEvent.change(titleInput, { target: { name: "title", value: title } })
        fireEvent.change(bodyInput, { target: { name: "body", value: body } })
        expect(getByText(/Send/i).closest('button')).toBeEnabled();
    })
    test("Button disabled Title and Body empty", () => {
        const { getByText } = render(<PostPage url={url} service={postSuccess} />)
        expect(getByText(/Send/i).closest('button')).toBeDisabled();
    })   
    test("Button disabled Title not empty, Body empty", () => {
        const { getByText } = render(<PostPage url={url} service={postSuccess} />)
        const titleInput = screen.getByTestId("title");
        const title = "Title1";
        fireEvent.change(titleInput, { target: { name: "title", value: title } })
        expect(getByText(/Send/i).closest('button')).toBeDisabled();
    }) 
    test("Button disabled Title empty, Body not empty", () => {
        const { getByText } = render(<PostPage url={url} service={postSuccess} />)
        const bodyInput = screen.getByTestId("body");
        const body = "Body1";
        fireEvent.change(bodyInput, { target: { name: "title", value: body } })
        expect(getByText(/Send/i).closest('button')).toBeDisabled();
    }) 
})