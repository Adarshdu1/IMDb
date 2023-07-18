import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
async function getMovie(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return await res.json();
}

export default async function Movie({ params }) {
  const movieId = params.id;
  const movie = await getMovie(movieId);
  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          width={500}
          height={300}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie Poster"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
        ></Image>
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3 flex items-center">
            <span className="font-semibold mr-1">
              <FiThumbsUp />
            </span>
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
