import AxBlogService from './blog.service'

describe("AxBlogService tests", () => {
    test("Fetch data status", () => {
         AxBlogService.axget(AxBlogService.API_URL)
        .then(res => expect(res.status).toBe(200));
    })

    //JSONPlaceHolder returns 100 posts
    test("Fetch data count", () => {
        AxBlogService.axget(AxBlogService.API_URL)
            .then(res => {
                expect(Object.keys(res.data).length).toBe(100);
            })
    })

    test("Post a blog", () => {
        AxBlogService.axpost(AxBlogService.API_URL, { userId: 9, title: "MyTitle", body: "My Message" })
            .then(res => {
                expect(res.status).toBe(201);
            })
    })
});