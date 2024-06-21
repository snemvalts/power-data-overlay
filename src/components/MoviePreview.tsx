import { useEffect, useRef, useState } from 'react'
import { FitRecord } from '../utils/parseFit'
import { buildMovie } from '../utils/buildMovie'
import { Movie } from 'etro/dist/movie'
import { MOVIE_HEIGHT, MOVIE_WIDTH, scalePixelValue } from '../utils/movieSizer'
import { saveBlob } from '../utils/saveBlob'

type Props = {
  records: FitRecord[]
}
export const MoviePreview = ({ records }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [paused, setPaused] = useState<boolean | null>(null)
  const [rendering, setRendering] = useState<boolean | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    console.log(canvasRef)
    setMovie(buildMovie(canvasRef.current!, records))
  }, [records])

  useEffect(() => {
    setPaused(false)
    movie?.play()
  }, [movie])

  const onPlayPauseClick = () => {
    if (!movie) return

    setPaused(movie.paused)

    if (movie.paused) {
      movie?.play()
    }

    movie.pause()
  }

  const onRewindClick = () => {
    if (!movie) return

    movie.seek(0)
  }

  const handleDownloadClick = async () => {
    if (!movie) return

    movie.pause()

    setRendering(true)
    const movieBlob = await movie.record({ frameRate: 1 })

    saveBlob(movieBlob, 'file.webm')
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        width={scalePixelValue(MOVIE_WIDTH)}
        height={scalePixelValue(MOVIE_HEIGHT)}
        style={{ width: '100%', height: '100%' }}
      ></canvas>

      <button disabled={rendering ?? false} onClick={onRewindClick}>
        ⏮
      </button>
      <button disabled={rendering ?? false} onClick={onPlayPauseClick}>
        {paused ? '▶️' : '⏸'}
      </button>
      <button onClick={handleDownloadClick} disabled={rendering ?? false}>
        {rendering ? 'Rendering...' : 'Render'}
      </button>
    </>
  )
}
