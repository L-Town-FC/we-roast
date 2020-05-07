/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    /* Your site config here */
    siteMetadata: {
        title: "We Roast",
        menuLinks: [
            {
                name: "Home",
                link: "/",
            },
            {
                name: "about",
                link: "/about",
            },
            {
                name: "conservation",
                link: "/conservation",
            },
            {
                name: "content",
                link: "/content",
            },
            {
                name: "blog",
                link: "/blog",
            },
        ],
        author: "L-Town-FC",
        description: "Its roasted",
    },
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
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
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
        `gatsby-transformer-remark`,
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
        // this plugin is for styling
        {
            resolve: `gatsby-plugin-typography`,
            options: {
                pathToConfigModule: `src/utils/typography`,
            },
        },
    ],
}
