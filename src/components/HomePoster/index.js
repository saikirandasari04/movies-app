import './index.css'

const HomePoster = props => {
  const {poster} = props
  const {posterPath, title, overview} = poster
  return (
    <>
      <div
        className="devices-container"
        alt={title}
        style={{
          backgroundImage: `url(${posterPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
        }}
      >
        <div className=" home-header-content heading-container">
          <h1 className=" movie-details-name home-poster-title">{title}</h1>
          <h1 className="home-poster-overview">{overview}</h1>
          <button
            className=" movies-details-play-button  home-poster-play-btn"
            type="button"
          >
            Play
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePoster
