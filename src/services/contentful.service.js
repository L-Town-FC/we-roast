const contentful = require("contentful")

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken,
})

export async function getEnryById(id) {
    try {
        const entry = await client.getEntry(id)
        return entry
    }
    catch (error){
        console.error(error)
    }
}

// Find contentful info from username
export async function getUserByEmail(email) {
    try {
        const allEntries = await client.getEntries({
            content_type: "person",
        })
        const userEntry = allEntries.items.find(person => {
            if (person.fields.email === email) {
                return person
            }
        })
        console.log(userEntry)
        return userEntry
    } catch (error) {
        console.error(error)
    }
}
