import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeBgContainer">
        <div className="supermanContainer">
          <Header />
        </div>
      </div>
    )
  }
}
export default Home
