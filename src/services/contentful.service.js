const contentful = require("contentful")

const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN

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
        if(!userEntry){
            console.log(`${email} doesn't exist in contentful`);
            const splitEmail = email.split("@")[0]
            console.log(splitEmail)
        }
        return userEntry
    } catch (error) {
        console.error(error)
    }
}
