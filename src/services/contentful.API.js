const sdk = require("contentful-management")
const spaceId = process.env.CONTENTFUL_SPACE_ID
const filePath = "./static/wr-logo.png"
const fileName = "we-roast-logo"
const contentType = "image/png"
const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
const authUtils = require("../services/auth.js")

const today = new Date()
const userEmail = authUtils.getProfile().email
const userName = authUtils.getProfile().nickname

const sdkClient = sdk.createClient({
    accessToken: accessToken,
})

const getEntryById = entryId => {
    sdkClient.getSpace(spaceId).then(space => {
        console.log(`Got space: ${space.name}`)
        space.getEntry(entryId).then(entry => {
            console.log(entry)
        })
    })
}

async function getBlogStructure() {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const blogPost = await environment.getContentType("blogPost")
        return blogPost.fields
    } catch (error) {
        console.error(error)
    }
}

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

async function createNewBlog(blogObject) {
    console.log(blogObject)
    // grab relevant parts of form
    const blogTitle = blogObject.title
    const blogSlug = blogTitle.replace(" ", "-")
    const blogAuthor = userName
    // TODO handle blog hero
    const blogDescription = blogObject.shortBio
    const blogBody = blogObject.blogBody
    const blogPublishDate = today
    // TODO handle tags

    const contentfulBlogFields = await getBlogStructure()
    let fields = {}
    Object.entries(contentfulBlogFields).forEach(field => console.log(field))

    // writes new blog
    // const newBlog = await createBlog()
}

module.exports = { createNewBlog, getEntryById }
