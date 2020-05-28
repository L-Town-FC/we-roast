require("dotenv").config()
const fs = require('fs');
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
    try {
        const newPost = await createNewBlog(body)
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
