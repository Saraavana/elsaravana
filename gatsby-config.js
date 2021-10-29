/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Saravana",
    description: "A student, professional engineer specialized in Machine Learning, Computer vision, data related solutions and meticulous in Mobile, Web and AR/VR application development  ",
    author: "@elsaravana",
    twitterUsername: "@elsaravana",
    image: "/twitter-img.png",
    siteUrl: "https://elsaravana.com",
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // Production URL - 'https://elsaravana-api.herokuapp.com' 
        // Local URL - 'http://localhost:1337'
        // apiURL: `http://localhost:1337`,
        apiURL: 'https://elsaravana-api.herokuapp.com',
        queryLimit: 1000, // Default to 100
        //   contentTypes : `jobs`, `projects`, `blogs`,
        //   singleType : `about`
        //  ONLY ADD TO ARRAY IF YOU HAVE DATA IN STRAPI !!!!
        contentTypes: [`jobs`, `projects`,`blogs`],
        singleTypes: [`about`],
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["400", "700"],
            },
            { family: "Open Sans" },
          ],
        },
      },
    },
  ],
}
