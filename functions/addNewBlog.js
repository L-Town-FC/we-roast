require("dotenv").config()
const sdk = require("contentful-management")
const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
const {
    getAccessTokenFromHeaders,
    validateAccessToken,
  } = require("./utils/auth")

const today = new Date()


const sdkClient = sdk.createClient({
    accessToken: accessToken,
})

// Get a specific entry from contentful by ID
const getEntryById = entryId => {
    sdkClient.getSpace(spaceId).then(space => {
        console.log(`Got space: ${space.name}`)
        space.getEntry(entryId).then(entry => {
            console.log(entry)
        })
    })
}

// Find contentful info from user's email
async function getUserById(userEmail) {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const allEntries = await environment.getEntries({
            content_type: "person",
        })
        Object.entries(allEntries.items).forEach(item => console.log(item))
    } catch (error) {
        console.error(error)
    }
}

// Gets the Structure for a blogPost
async function getBlogStructure() {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const blogPost = await environment.getContentType("blogPost")
        return blogPost
    } catch (error) {
        console.error(error)
    }
}

// Function that writes validated blog to contentful
async function createBlog(blogData) {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const entry = await environment.createEntry("blogPost", blogData)
        return entry
    } catch (error) {
        console.error(error)
    }
}

// Function that reads and validates incoming blogObjects
async function createNewBlog(blogObject) {
    console.log(blogObject)
    // grab relevant parts of form
    const blogTitle = blogObject.title
    const blogSlug = blogTitle.replace(" ", "-")
    const blogAuthor = blogObject.author
    // TODO handle blog hero
    const blogDescription = blogObject.shortBio
    const blogBody = blogObject.blogBody
    const blogPublishDate = today
    // TODO handle tags

    // map blogObject details to fields
    let newBlogData = { fields: {} }
    newBlogData.fields.title = { "en-US": blogTitle }
    newBlogData.fields.slug = { "en-US": blogSlug }
    // newBlogData.fields.author = { "en-US": blogAuthor}
    newBlogData.fields.description = { "en-US": blogDescription }
    newBlogData.fields.body = { "en-US": blogBody }
    newBlogData.fields.publishDate = { "en-US": blogPublishDate }
    console.log(newBlogData)

    const contentfulBlog = await getBlogStructure()
    Object.entries(contentfulBlog.fields).forEach(entry => console.log(entry))

    // writes new blog
    const newBlog = await createBlog(newBlogData)

    return newBlog
}

exports.handler = async event => {
    console.log(event.headers)
    const token = getAccessTokenFromHeaders(event.headers)
    let user = await validateAccessToken(token)
    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({ err: "User is not authorized" }),
        }
    }

    const body = JSON.parse(event.body)
    // validation
    // if (!body.name || !body.handle || !body.tags || body.tags.length === 0) {
    //     return {
    //         statusCode: 403,
    //         body: JSON.stringify({
    //             msg: "Each influencer must include a name, handle, and tags",
    //         }),
    //     }
    // }
    try {
        // body.approved = false
        // body.votes = 0
        // const record = await table.create(body)
        const newPost = await createNewBlog(body)
        console.log(newPost)
        return {
            statusCode: 200,
            body: JSON.stringify({ newPost }),
        }
    } catch (err) {
        console.error(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                msg: "Failed to create record in Contentful",
            }),
        }
    }
}