const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const slugify = require('@sindresorhus/slugify')


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    let slug = value;

    console.log(`node.fileAbsolutePath -> ${node.fileAbsolutePath}`)
    console.log(`node.frontmatter.slug -> ${node.frontmatter.slug}`)

    if (node.fileAbsolutePath.includes('content/blog/')) {

      if(node.frontmatter.slug){
        slug = `blog/${node.frontmatter.slug}`
      }

      slug = `blog${createFilePath({ node, getNode, basePath: `content/blog` })}`
    }


    createNodeField({
      name: `slug`,
      node,
      value:slug,
    })
  }
}
