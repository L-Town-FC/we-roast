/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

const sitConfig = require("./src/utils/siteConfig")

let contentfulConfig
try {
    contentfulConfig = require("./.contentful.json")
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


// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js


module.exports = {
    /* Your site config here */
    siteMetadata: sitConfig.metaData,
    plugins: [
        `gatsby-plugin-dark-mode`,
        {
            resolve: "gatsby-plugin-antd",
            options: {
                style: true,
            },
        },
        {
            resolve: `gatsby-plugin-less`,
            options: {
                javascriptEnabled: true,
                modifyVars: {
                    "primary-color": "#362d26",
                    "font-family": "Arial",
                    "layout-body-background": "#FFFFFF",
                },
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `we roast`,
                short_name: `we roast`,
                start_url: `/`,
                background_color: `#FFFFFF`,
                theme_color: `#5A3311`,
                display: `roast manifest`,
                icon: `static/favicon.ico`, // This path is relative to the root of the site.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src/pages`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/src/`,
            },
        },
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 800,
                        },
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: "gatsby-source-contentful",
            options: contentfulOptions,
        },
        // {
        //     resolve: "contentful-editor",
        //     options: contentfulOptions,
        // },
        `gatsby-plugin-netlify`,
        `gatsby-remark-images`,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
    ],
}
