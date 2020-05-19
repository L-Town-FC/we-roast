const sdk = require("contentful-management")
const spaceId = process.env.CONTENTFUL_SPACE_ID
const filePath = "./static/wr-logo.png"
const fileName = "we-roast-logo"
const contentType = "image/png"
const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN

const today = new Date()

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

async function getUserById(userEmail) {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const allEntries = await environment.getEntries({'content_type': 'person'})
        Object.entries(allEntries.items).forEach(item => console.log(item))
    } catch (error) {
        console.error(error)
    }
}

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
    const blogAuthor = blogObject.author
    // TODO handle blog hero
    const blogDescription = blogObject.shortBio
    const blogBody = blogObject.blogBody
    const blogPublishDate = today
    // TODO handle tags

    // map blogObject details to fields
    let newBlogData = { fields: {}}
    newBlogData.fields.title = { "en-US": blogTitle}
    newBlogData.fields.slug = { "en-US": blogSlug}
    // newBlogData.fields.author = { "en-US": blogAuthor}
    newBlogData.fields.description = { "en-US": blogDescription}
    newBlogData.fields.body = { "en-US": blogBody}
    newBlogData.fields.publishDate = { "en-US": blogPublishDate }
    console.log(newBlogData)
    
    
    const contentfulBlog = await getBlogStructure()
    Object.entries(contentfulBlog.fields).forEach(entry => console.log(entry))

    // writes new blog
    // const newBlog = await createBlog(newBlogData)
}

module.exports = { createNewBlog, getEntryById, getUserById }
