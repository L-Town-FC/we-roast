const contentful = require("contentful")

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
})

export async function getEnryById(id) {
    const entry = await client.getEntry(id)
    return entry
}
