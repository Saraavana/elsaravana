// /**
//  * SEO component that queries for data with
//  *  Gatsby's useStaticQuery React hook
//  *
//  * See: https://www.gatsbyjs.org/docs/use-static-query/
//  */

// import React from "react"
// import PropTypes from "prop-types"
// import Helmet from "react-helmet"
// import { useStaticQuery, graphql } from "gatsby"
// // import { StaticQuery, graphql } from "gatsby"


// const SEOO = ({title,description}) => (
//   <useStaticQuery
//   query={queryy}
//   render={({
//     site: {
//       siteMetadata : {
//         title,
//         description,
//       }
//     }
//   }) => {
//     const seoo = {
//       title: title || defaultTitle,
//       description: description || defaultDescription,
//     };
//     return (
//       <>
//       <Helmet title={seoo.title}>
//       <meta name="description" content={seoo.description}/>
//       </Helmet>
//       )
//   }}
//   />
//   )

// export default SEOO;

// SEOO.propTypes = {
//   title = PropTypes.string,
//   description = PropTypes.string,
// };

// SEOO.defaultProps = {
//   title = null,
//   defaultProps = null,
// };


// const queryy =  graphql`
// query SEOO {
//   site {
//     siteMetadata {
//       title
//       description
//     }
//   }
// }
// `;



// // function SEO({ description, lang, meta, keywords, title }) {
// //   const { site } = useStaticQuery(
// //     graphql`
// //       query {
// //         site {
// //           siteMetadata {
// //             title
// //             description
// //             author
// //           }
// //         }
// //       }
// //     `
// //   )

// //   const metaDescription = description || site.siteMetadata.description

// //   return (
// //     <Helmet
// //       htmlAttributes={{
// //         lang,
// //       }}
// //       title={title}
// //       titleTemplate={`%s | ${site.siteMetadata.title}`}
// //       meta={[
// //         {
// //           name: `description`,
// //           content: metaDescription,
// //         },
// //         {
// //           property: `og:title`,
// //           content: title,
// //         },
// //         {
// //           property: `og:description`,
// //           content: metaDescription,
// //         },
// //         {
// //           property: `og:type`,
// //           content: `website`,
// //         },
// //         {
// //           name: `twitter:card`,
// //           content: `summary`,
// //         },
// //         {
// //           name: `twitter:creator`,
// //           content: site.siteMetadata.author,
// //         },
// //         {
// //           name: `twitter:title`,
// //           content: title,
// //         },
// //         {
// //           name: `twitter:description`,
// //           content: metaDescription,
// //         },
// //       ]
// //         .concat(
// //           keywords.length > 0
// //             ? {
// //                 name: `keywords`,
// //                 content: keywords.join(`, `),
// //               }
// //             : []
// //         )
// //         .concat(meta)}
// //     />
// //   )
// // }

// // SEO.defaultProps = {
// //   lang: `en`,
// //   meta: [],
// //   keywords: [],
// //   description: ``,
// // }

// // SEO.propTypes = {
// //   description: PropTypes.string,
// //   lang: PropTypes.string,
// //   meta: PropTypes.arrayOf(PropTypes.object),
// //   keywords: PropTypes.arrayOf(PropTypes.string),
// //   title: PropTypes.string.isRequired,
// // }

// // export default SEO


import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery } from 'gatsby';

const SEO = ({
  title = null,
  description = null,
}) => (
  <StaticQuery
    query={graphql`
      query SEOQuery {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          defaultDescription,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
      };

      return (
        <>
          <Helmet title={seo.title}>
            <meta name="description" content={seo.description} />
          </Helmet>
        </>
      );
    }}
  />
);

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
};

export default SEO;

