require("dotenv").config()
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
            body: JSON.stringify({ success: true, newPost }),
        }
    } catch (err) {
        console.error(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                msg: "Failed to create new blog in Contentful",
            }),
        }
    }
}
