import React from 'react'

import './NotFound.sass'
import { Link } from 'react-router-dom'

const NotFound = () =>
  <section id="NotFound">
    {console.log('NOT FOUND XXXXXXXXXXXXXXXX')}
    <div id="PageContainer" className="container-fluid">
      <div id="PageRow" className="row">

        <article className="PageHead col-10 offset-1">
          <h2 className="Header">NOT FOUND</h2>
        </article>

        <article className="PageBody col-10 offset-1">
          <h4 className="Message">Sorry... The page you&apos;re looking for doesn&apos;t exist.</h4>
          <Link className="Back" to="/order">BACK</Link>
        </article>

      </div>
    </div>
  </section>

export default NotFound
