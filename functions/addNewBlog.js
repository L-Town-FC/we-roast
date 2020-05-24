require("dotenv").config()
const sdk = require("contentful-management")
const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN
const {
    getAccessTokenFromHeaders,
    validateAccessToken,
} = require("./utils/auth")

const { createNewBlog } = require("./utils/contentful")

exports.handler = async (event, context, callback) => {
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
        // console.log(newPost)
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
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
