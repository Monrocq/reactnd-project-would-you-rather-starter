import React, { Component } from 'react'
import { connect } from 'react-redux'

export const HOME_PATH = '/';

export class Home extends Component {
  render() {
    return (
      <div>
          heyyyyy
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(Home)
