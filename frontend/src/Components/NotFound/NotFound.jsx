import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNavLinkActive } from '../Order/util'

import './NotFound.sass'

const NotFound = () => {
  useEffect(
    () => { setNavLinkActive('None') },
    []
  )
  return (
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
  )
}
export default NotFound
