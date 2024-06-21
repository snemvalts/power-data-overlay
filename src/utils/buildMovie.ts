import etro from 'etro'
import { FitRecord } from './parseFit'
import { fitRecordsToPowerMovieFrames, fitRecordsToSpeedMovieFrames } from './fitRecordsToMovieFrames'


export const buildMovie = (canvas: HTMLCanvasElement, records: FitRecord[]) => {
  const movie = new etro.Movie({
    canvas,
  })



  const layer = new etro.layer.Visual({
    startTime: 0,
    duration: records.length,
    background: etro.parseColor('#00FF00'),
  })


  movie.layers.push(layer)

  movie.layers.push(...fitRecordsToSpeedMovieFrames(records))
  movie.layers.push(...fitRecordsToPowerMovieFrames(records, 0, 100))


  return movie
}
