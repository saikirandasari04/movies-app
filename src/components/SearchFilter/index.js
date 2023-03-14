import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SearchHeader from '../SearchHeader'
import FailureView from '../FailureView'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchFilter extends Component {
  state = {
    searchInput: '',
    searchMovies: [],
    apiStatus: apiStatusConstants.initial,
  }

  getSearchMovies = async () => {
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        posterPath: each.poster_path,
        title: each.title,
        id: each.id,
        backdropPath: each.backdrop_path,
      }))
      this.setState({
        searchMovies: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  searchInput = text => {
    this.setState(
      {apiStatus: apiStatusConstants.inProgress, searchInput: text},
      this.getSearchMovies,
    )
  }

  onRetry = () => {
    this.getSearchMovies()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" height={35} width={380} color=" #D81F26" />
    </div>
  )

  renderNotfoundMovies = () => {
    const {searchInput} = this.state
    return (
      <div className="search-heading-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <p className="search-not-found-heading">
          Your search for {searchInput} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchMovies} = this.state
    return (
      <>
        {searchMovies.length > 0 ? (
          <>
            <div className="search-filter-bg-container">
              <div className="search-filter-movies-list-container">
                <ul className="search-filter-ul-container">
                  {searchMovies.map(each => (
                    <li className="search-filter-li-item" key={each.id}>
                      <Link to={`/movies/${each.id}`} target="blank">
                        <img
                          className="search-poster"
                          src={each.posterPath}
                          alt={each.title}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          this.renderNotfoundMovies()
        )}
      </>
    )
  }

  renderSearchMovies = () => {
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
      <div className="search-filter-bg-container">
        <SearchHeader searchInput={this.searchInput} />
        <div>{this.renderSearchMovies()}</div>
        <Footer />
      </div>
    )
  }
}
export default SearchFilter
