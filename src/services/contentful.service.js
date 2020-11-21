const contentful = require("contentful")
const { navigate } = require("gatsby")

let contentfulConfig
try {
    contentfulConfig = require("../../.contentful.json")
} catch (e) {
    // only runs in production on netlify
    contentfulConfig = {
        production: {
            spaceId: process.env.CONTENTFUL_SPACE_ID,
            accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        },
    }
}
const contentfulOptions =
    process.env.NODE_ENV === "development"
        ? contentfulConfig.development
        : contentfulConfig.production

const { spaceId } = contentfulOptions

const client = contentful.createClient({
    ...contentfulOptions,
    space: spaceId,
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
        // no user in contentful matches email from authentication
        if(!userEntry){
            console.log(`${email} doesn't exist in contentful`)
            const splitEmail = email.split("@")[0]
            const res = await fetch("/.netlify/functions/addNewPerson", {
                method: "POST",
                body: JSON.stringify({userName: splitEmail, email}),
                headers: { authorization: `Bearer ${token}` },
            })
            if(res.status===200){
                console.log("Person created")
                userEntry = res.body.newPerson
                navigate("/account")
            }
        }
        console.log(userEntry)
        return userEntry
    } catch (error) {
        console.error(error)
    }
}
