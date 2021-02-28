import React from "react"
import Layout from "../components/Layout"

const contact = () => {
  return <Layout>
    <section className="contact-page">
      <article className="contact-form">
        <h3>get in touch</h3>
        <form method="POST" data-netlify="true">
          <div className="form-group">
            <input type="text" placeholder="name" name="name" className="form-control"/>
            <input type="email" placeholder="email" name="email" className="form-control"/>
            <textarea name="message" rows="5" placeholder="message" className="form-control"/>
            <div className="field">
              <div data-netlify-recaptcha="true"></div>
            </div>
          </div>
          <button type="submit" className="submit-btn btn">
            submit here
          </button>
        </form>
      </article>
    </section>
  </Layout>
}

export default contact
