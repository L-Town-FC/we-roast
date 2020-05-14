const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark` && node.parent) {
        const fileNode = getNode(node.parent)
        console.log(`\n`, fileNode.relativePath)
        if (fileNode.relativePath) {
            const slug = createFilePath({ node, getNode, basePath: `pages` })
            createNodeField({
                node,
                name: `slug`,
                value: slug,
            })
        }
    }
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"
        // Update the page.
        createPage(page)
    }
}

exports.createPages = async ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions
    // used for local markdown
    const localMarkdown = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)
    localMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
        node.fields
            ? createPage({
                  path: node.fields.slug,
                  component: path.resolve(`./src/templates/local-post.js`),
                  context: {
                      slug: node.fields.slug,
                  },
              })
            : {}
    })
    // used for contenful
    const contenfulResult = await graphql(`
        {
            allContentfulBlogPost {
                edges {
                    node {
                        title
                        slug
                    }
                }
            }
            allContentfulPerson {
                edges {
                    node {
                        name
                        title
                        username
                    }
                }
            }
        }
    `)
    contenfulResult.data.allContentfulBlogPost.edges.forEach(({ node }) => {
        createPage({
            path: `/blog/${node.slug}/`,
            component: path.resolve(`./src/templates/contentful-post.js`),
            context: {
                slug: node.slug,
            },
        })
    })
    contenfulResult.data.allContentfulPerson.edges.forEach(({ node }) => {
        createPage({
            path: `/user/${node.username}`,
            component: path.resolve(`./src/templates/site-user.js`),
            context: {
                username: node.username,
            },
        })
    })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (["build-html", "develop-html"].includes(stage)) {
        /*
         * During the build step, `auth0-js` will break because it relies on
         * browser-specific APIs. Fortunately, we don’t need it during the build.
         * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
         * during the build. (See `src/utils/auth.js` to see how we prevent this
         * from breaking the app.)
         */
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /auth0-js/,
                        use: loaders.null(),
                    },
                ],
            },
            node: {
                fs: "empty",
            },
        })
    }
}

// exports.onCreateBabelConfig = ({ actions }) => {
//     actions.setBabelPlugin({
//         name: "babel-plugin-import",
//         options: {
//             libraryName: "antd",
//             style: true,
//         },
//     })
// }
