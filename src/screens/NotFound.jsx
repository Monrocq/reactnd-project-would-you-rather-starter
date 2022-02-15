import React, { Component } from 'react'
import { connect } from 'react-redux'

export class NotFound extends Component {
  render() {
    return (
      <div>
        Page introuvable
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(NotFound)
