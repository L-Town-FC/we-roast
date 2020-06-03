require("dotenv").config()
const sdk = require("contentful-management")
const fs = require("fs")
const path = require("path")
const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN

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

// Find contentful info from username
async function getUserEntry(userName) {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")
        const allEntries = await environment.getEntries({
            content_type: "person",
            // title: userName,
        })
        const userEntry = allEntries.items.find(person => {
            if (person.fields.username["en-US"] === userName) {
                return person
            }
        })
        return userEntry
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

async function createNewImage(imageData) {
    try {
        let imageFields = {
            fields: {
                title: {
                    "en-US": imageData.title,
                },
                description: {
                    "en-US":
                        "Hero image for blog",
                },
                file: {
                    "en-US": {
                        contentType: imageData.contentType,
                        fileName: imageData.fileName,
                        upload: imageData.url,
                    },
                },
            },
        }
        if (imageData.file) {
            const base64Data = imageData.file
            const base64Image = base64Data.split(';base64,').pop();
            const relativePath = `./${imageData.fileName}`
            const relativeNetlifyPath = (process.env.LAMBDA_TASK_ROOT)? path.resolve(process.env.LAMBDA_TASK_ROOT, relativePath): path.resolve(__dirname, relativePath)
            fs.writeFile(relativeNetlifyPath, base64Image, {encoding: 'base64'}, function(err) {
                console.log(`Created file ${relativeNetlifyPath}`);
                imageFields.fields.file = {
                    "en-US": {
                        contentType: imageData.contentType,
                        fileName: imageData.fileName,
                        file: fs.createReadStream(relativeNetlifyPath),
                    },
                }
            });
        }
        // console.log(imageFields)
        // return null
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")

        const newImage = imageData.file ? await environment.createAssetFromFiles(imageFields) : await environment.createAsset(imageFields)
        // const newImage = await environment.createAsset(imageFields)
        const newImageProcessed = await newImage.processForLocale("en-US")
        // const newPublished = await newImageProcessed.publish()
        return newImageProcessed
    } catch (error) {
        console.error(error)
    }
}

// Function that reads and validates incoming blogObjects
async function createNewBlog(blogObject) {
    // grab relevant parts of form
    const blogTitle = blogObject.title
    const blogSlug = blogTitle.replace(" ", "-")
    const blogAuthor = blogObject.author
    // TODO handle blog hero
    let heroId
    if (!blogObject.hero) {
        newImgObject = {
            url: "https://source.unsplash.com/featured/?coffee",
            contentType: "image/jpeg",
            fileName: `random-${blogSlug}-hero`,
            title: `${blogSlug}-default-hero`,
        }
        const newHeroImage = await createNewImage(newImgObject)
        heroId = newHeroImage.sys.id
    } else {
        const firstImage = blogObject.hero[0]
        const newImgObject = {
            url: firstImage.thumbUrl,
            contentType: firstImage.type,
            fileName: firstImage.name,
            file: blogObject.imageUrl,
            title: `${blogSlug}-custom-hero`,
        }
        const newHeroImage = await createNewImage(newImgObject)
        heroId = newHeroImage.sys.id
    }
    const blogDescription = blogObject.shortBio
    const blogBody = blogObject.blogBody
    const blogPublishDate = today
    // TODO handle tags

    // map blogObject details to fields
    let newBlogData = { fields: {} }

    newBlogData.fields.title = { "en-US": blogTitle }

    newBlogData.fields.slug = { "en-US": blogSlug }

    newBlogData.fields.heroImage = {
        "en-US": {
            sys: { type: "Link", linkType: "Asset", id: heroId },
        },
    }

    const authorLink = await getUserEntry(blogAuthor)
    newBlogData.fields.author = {
        "en-US": {
            sys: { type: "Link", linkType: "Entry", id: authorLink.sys.id },
        },
    }
    newBlogData.fields.description = { "en-US": blogDescription }

    newBlogData.fields.body = { "en-US": blogBody }

    newBlogData.fields.publishDate = { "en-US": blogPublishDate }

    // const contentfulBlog = await getBlogStructure()
    // Object.entries(contentfulBlog.fields).forEach(entry => console.log(entry))

    // writes new blog
    const newBlog = await createBlog(newBlogData)
    return newBlog
}

module.exports = {
    getBlogStructure,
    getEntryById,
    createNewBlog,
    getUserEntry,
}
