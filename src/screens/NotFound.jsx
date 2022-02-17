import React from 'react'
import { connect } from 'react-redux'
import {useParams} from 'react-router';

function NotFound() {
  const params = useParams();
  let uri = Object.values(params)[0]
  return (
    <div>
      {uri === "404" ? "Question not found" : "Page not found"}
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)(NotFound)
