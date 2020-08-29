require("dotenv").config()
const sdk = require("contentful-management")
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

/** Function that writes validated blog to contentful
 * @param {String} entryType Type of contentful entry being created
 * @param {Object} entryObject Object representing new entry
 * @param {String} contentfulEnv Environment to publish entry to
 */
async function createCustomEntry(entryType, entryObject, contentfulEnv = "master") {
    try {
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment(contentfulEnv)
        const entry = await environment.createEntry(entryType, entryObject)
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
                    "en-US": "Hero image for blog",
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
            const newImageData = new Buffer.from(imageData.file.replace(/^data:image\/[a-z]+;base64,/, ''), 'base64');
            imageFields.fields.file = {
                "en-US": {
                    contentType: imageData.contentType,
                    fileName: imageData.fileName,
                    file: newImageData,
                },
            }
        }
        // console.log(imageFields)
        // return null
        const space = await sdkClient.getSpace(spaceId)
        const environment = await space.getEnvironment("master")

        const newImage = imageData.file
            ? await environment.createAssetFromFiles(imageFields)
            : await environment.createAsset(imageFields)
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
    const newBlog = await createCustomEntry("blogPost", newBlogData)
    return newBlog
}

/** Function that creates a new 
 * @param {*} personObject Object representing new person in contentful
 */
async function createNewPerson(personObject) {
    const {userName, email} = personObject
    let newPersonData = { fields: {} }
    newPersonData.fields.name = { "en-US": "testName" }
    newPersonData.fields.username = { "en-US": userName }
    newPersonData.fields.title = { "en-US": "test title" }
    newPersonData.fields.company = { "en-US": "test company" }
    newPersonData.fields.shortBio = { "en-US": "test short bio" }
    newPersonData.fields.email = { "en-US": email }
    newPersonData.fields.image = {
        "en-US": {
            sys: { type: "Link", linkType: "Asset", id: "6Od9v3wzLOysiMum0Wkmme" },
        },
    }
    const newPerson = await createCustomEntry("person", newPersonData)
    return newPerson
}

module.exports = {
    getBlogStructure,
    getEntryById,
    createNewBlog,
    createNewPerson,
    getUserEntry,
}
