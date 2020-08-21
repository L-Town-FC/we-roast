const contentful = require("contentful")
const { navigate } = require("gatsby")


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

// Find contentful info from email address
export async function getUserByEmail(email, token) {
    try {
        const allEntries = await client.getEntries({
            content_type: "person",
        })
        let userEntry = allEntries.items.find(person => {
            if (person.fields.email === email) {
                return person
            }
        })
        if(!userEntry){
            console.log(`${email} doesn't exist in contentful`)
            const splitEmail = email.split("@")[0]
            console.log(splitEmail)
            console.log(token)
            // create new user and return it to ui
        }
        return userEntry
    } catch (error) {
        console.error(error)
    }
}
