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
        name: "premium coffee",
        link: "/",
      },
      {
        name: "about us",
        link: "/about",
      },
      {
        name: "conversation",
        link: "/conversation",
      },
      {
        name: "content",
        link: "/content",
      },
      {
        name: "blog",
        link: "/blog",
      },
      {
        name: "login",
        link: "/login",
      },
    ],
    author: "L-Town-FC",
    description: "Its roasted",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    // `gatsby-plugin-offline`,

    // this plugin is for styling
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    //},
  ],
}
