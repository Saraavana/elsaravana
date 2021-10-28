import React from "react"
import Image from "gatsby-image"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import SocialLinks from "../constants/socialLinks"

const query = graphql`
{
  file(relativePath: {eq: "hero-img.png"}) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`
const Hero = () => {
  const {
    file: {
      childImageSharp :{ fluid }
    },
  } = useStaticQuery(query)

  return <header className="hero">
    <div className="section-center hero-center">
      <article className="hero-infor">
        <div>
          <div className="underline"></div>
          <h1>I'm Saravana</h1>
          <h5> specialized in solving computer vision, machine learning and data analytical problems. I would also develop end-to-end iOS, Android and AR applications</h5>
          <Link to="/contact" className="btn">
            contact me
          </Link>
          <SocialLinks/>
        </div>
      </article>
      <Image fluid={fluid} className="hero-img"/>
    </div>
  </header>
}

export default Hero