import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import {
  Button,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

import {
  fetchFiddles,
  displayFiddles,
  clearFiddles,
  inactiveFiddles
} from '../actions/fiddleActions'

import {
  displayAbout,
  inactiveAbout
} from '../actions/aboutActions'

import {
  LoadingSpinner,
  AboutUs,
  ErrorComponent,
  FooterCont
} from '../components/All'

import {
  FiddlesJS
} from '../components/Fiddles'

@connect((store) => {
  return {
    fiddles: store.fiddles,
    about: store.about
  }
})

export default class Layout extends React.Component {
  componentWillMount () {
    // fetch session here
    this.props.dispatch(displayAbout())
  }

  needsCache (key) {
    // return true if needs cache refresh or null
    const life = 1000 * 60 * 1
    let myObj = this.props[key]
    let ret = true; // assume needed

    if (myObj.cache) {
      // cache exists
      let d = new Date();
      let millis = d.getTime()
      let diff = (millis - myObj.cache) - life

      ret =  diff > 0 ? true : false; // gtn 0 refresh
    }
    return ret
  }

  clearStore () {
    this.props.dispatch(clearFiddles())
  }

  clearTabs () {
    this.props.dispatch(inactiveAbout())
    this.props.dispatch(inactiveFiddles())
  }

  fetchAbout (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()
    this.props.dispatch(displayAbout())
  }

  fetchFiddles (e) {
    e.preventDefault()
    e.target.blur()
    this.clearTabs()
    if (this.needsCache('fiddles')) {
      this.props.dispatch(fetchFiddles())
    } else {
      this.props.dispatch(displayFiddles())
    }
  }

  isActive (value) {
    return value === true ? 'active' : ''
  }

  render () {
    const {fiddles, about} = this.props

    let tab = <LoadingSpinner />

    if (fiddles.isActive) {
      tab = <FiddlesJS data={fiddles.fiddleitems} />
    } else if (fiddles.fetching) {
      tab = <LoadingSpinner />
    } else if (about.isActive) {
      tab = <AboutUs />
    } else if (fiddles.error) {
      tab = <ErrorComponent data={fiddles.error.message} />
    }

    return <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Toggle />
          <Navbar.Brand>
            <a
              href='#'
              onClick={this.fetchAbout.bind(this)}
            >Brand
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              eventKey={1}
              className={this.isActive(this.props.about.isActive)}
              onClick={this.fetchAbout.bind(this)}
              href='#'
            >About
            </NavItem>

            <NavItem
              eventKey={3}
              className={this.isActive(this.props.fiddles.isActive)}
              onClick={this.fetchFiddles.bind(this)}
              href='#'
            >Patterns
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 main-content-area'>
            {tab}
          </div>
        </div>
      </div>
      <div className='footer'>
        <FooterCont />
      </div>
    </div>
  }
}
