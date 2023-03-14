import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Footer from '../Footer'
import FailureView from '../FailureView'

import Header from '../Header'

import './index.css'
import MovieDetail from '../MovieDetail'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        id: data.movie_details.id,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        title: data.movie_details.title,
        overview: data.movie_details.overview,
        originalLanguage: data.movie_details.original_language,
        releaseDate: data.movie_details.release_date,
        count: data.movie_details.vote_count,
        rating: data.movie_details.vote_average,
        runtime: data.movie_details.runtime,
        posterPath: data.movie_details.poster_path,
        adult: data.movie_details.adult,
      }
      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))
      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )
      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        spokenLanguages: updatedLanguagesData,
        similarMovies: updatedSimilarData.slice(0, 6),
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {releaseDate, count, rating, budget} = movieDetails

    return (
      <ul>
        <li className="">
          <div className="">
            <MovieDetail movieDetails={movieDetails} key={movieDetails.id} />
          </div>
        </li>
        <li className="additional-movie-info-container additional-info-sm-container">
          <div className="each-genre-ul-container">
            <h1 className="movie-info-genre-heading">Genres</h1>
            <ul>
              {genres.map(eachGenre => (
                <li className="movie-info-each-genre" key={eachGenre.id}>
                  <p>{eachGenre.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-genre-heading">Audio Available</h1>
            <ul>
              {spokenLanguages.map(eachAudio => (
                <li className="movie-info-each-genre" key={eachAudio.id}>
                  <p>{eachAudio.language}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-rating-count-heading">Rating Count</h1>
            <p className="movie-info-rating-count">{count}</p>
            <h1 className="movie-info-rating-avg-heading">Rating Average</h1>
            <p className="movie-info-rating">{rating}</p>
          </div>
          <div className="each-genre-ul-container">
            <h1 className="movie-info-budget-heading">Budget</h1>
            <p className="movie-info-budget">{budget}</p>
            <h1 className="movie-info-release-date">Release Date</h1>
            <p>{releaseDate}</p>
          </div>
        </li>
        <li className="similar-movies-container">
          <h1 className="more-like-this">More like this</h1>
          <ul className="popular-ul-container similar-ul-container">
            {similarMovies.map(each => (
              <li className="popular-li-item" key={each.id}>
                <Link to={`/movies/${each.id}`} target="blank">
                  <img
                    className="popular-poster"
                    src={each.posterPath}
                    alt={each.title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    )
  }

  renderVideoDetailView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="root-container">
        <Header />
        <div
          className="video-details-view-container"
          data-testid="videoItemDetails"
        >
          {this.renderVideoDetailView()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default MovieItemDetails
