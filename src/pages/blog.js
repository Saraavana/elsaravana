import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Blogs from "../components/Blogs"

const Blog = ({
  data:{allStrapiBlogs:{nodes:blogs},
  },
}) => {
  return <Layout>
    <section className="blog-page">
      <Blogs blogs={blogs} title="blog"/>
    </section>
  </Layout>
}


export const query = graphql`
  {
    allStrapiBlogs(sort: {fields: date, order: DESC}) {
      nodes {
        slug
        date(formatString: "MMMM Do, YYYY")
        id
        desc
        title
        category
      }
    }
  }
`

export default Blog
