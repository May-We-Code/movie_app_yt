import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import loading_spinner from "./../assets/loading_spinner.gif";
import axios from "axios";
import NavBar from "./../Components/NavBar";
import play_icon from "./../assets/play_icon.png";
async function getMovie(movieId) {
  const res =
    await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}
    `);
  return res.data;
}

async function getClips(movieId) {
  const res =
    await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}

    `);
  return res.data.results;
}

function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState("loading");
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.screen.availWidth);
  const [clips, setClips] = useState([]);
  let mt = width > 786 ? (width * 9) / 16 - 250 : 0;

  window.addEventListener("resize", () => {
    setWidth(window.screen.availWidth);
  });

  useEffect(() => {
    getMovie(movieId)
      .then((res) => {
        setMovie(res);
        getClips(movieId)
          .then((res) => {
            setClips(res);
          })
          .catch((err) => {
            alert(err);
            navigate("/", { replace: true });
          });

        if (width > 786) {
          window.scroll({ top: mt - 100, behavior: "smooth" });
        }
      })
      .catch((err) => {
        alert(err);
        navigate("/", { replace: true });
      });
  }, [movieId, navigate, mt, width]);

  if (movie === "loading" || !movie) {
    return (
      <div className='bg-gray-700 h-screen flex items-center justify-center'>
        <img src={loading_spinner} alt='loading' />
      </div>
    );
  }

  return (
    <div className='bg-gray-700 min-h-[100vh] text-white text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-6xl font-bold'>
      {width < 768 ? (
        <NavBar />
      ) : (
        <img
          src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path}
          alt='backdrop'
          className='w-screen aspect-video absolute top-0'
        />
      )}
      <div
        className='flex flex-col items-center justify-center md:flex-row md:ml-[50px]'
        style={{
          marginTop: `${mt}px`,
        }}
      >
        <img
          src={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
          alt='poster'
          className='rounded-xl border-white border-4 max-w-[min(400px,90%)] sm:max-w-[50%]  md:h-[576px] z-10'
        />
        <h1 className='z-10 md:ml-10 text-center'>{movie.title}</h1>
      </div>

      {/*Clips And Trailers Part */}
      <div className='mt-5 md:mt-10 text-xl md:text-2xl lg:text-4xl pb-[100px] mx-2 sm:mx-5 md:mx-[50px] lg:mx-[100px]'>
        <div className='mt-5 md:mt-10 text-lg md:text-xl lg:text-2xl'>
          <div>
            Release Date :-
            <span className=' font-normal'>{movie.release_date}</span>
          </div>
          <div>
            Duration :-
            <span className=' font-normal'>
              {parseInt(movie.runtime / 60)}:{movie.runtime % 60} hr
            </span>
          </div>
          <div>
            Rating :-
            <span className=' font-normal'>{movie.vote_average}/10</span>
          </div>
        </div>
        Clips And Trailers
        <div className='flex overflow-scroll scrollbar-hide snap-x mt-5 md:mt-10'>
          {clips.map((clip) => (
            <div
              className='ml-5'
              onClick={() => {
                window.open(`https://youtube.com/watch?v=${clip.key}`);
              }}
            >
              <div className='relative flex-shrink-0 h-[180px] md:h-[250px] lg:h-[300px] aspect-video rounded-xl'>
                <img
                  src={`https://img.youtube.com/vi/${clip.key}/hqdefault.jpg`}
                  className='absolute object-cover h-[180px] md:h-[250px] lg:h-[300px] aspect-video rounded-xl '
                  alt='youtube thumbnail'
                />
                <img
                  src={play_icon}
                  alt='play icon'
                  className='absolute inset-0 w-[150px] h-[150px] m-auto'
                />
              </div>
              <p className='text-lg md:text-xl font-normal mt-1'>{clip.name}</p>
            </div>
          ))}
        </div>
        {/* Overview */}
        <div className='mt-5 md:mt-10'>OverView</div>
        <div className='mt-5 md:mt-10 font-normal text-lg md:text-xl lg:text-2xl'>
          {movie.overview}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
