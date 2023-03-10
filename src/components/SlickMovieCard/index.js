import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
}

class SlickMovieCard extends Component {
  renderSlider = () => {
    const {movies} = this.props
    return (
      <>
        <Slider {...settings}>
          {movies.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id} target="blank">
              <li className="react-slick-li-item">
                <img
                  className="slick-movie-img"
                  src={each.posterPath}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </Slider>
      </>
    )
  }

  render() {
    return (
      <div className="slick-app-container">
        <div style={{width: '95%'}}>{this.renderSlider()}</div>
      </div>
    )
  }
}
export default SlickMovieCard
