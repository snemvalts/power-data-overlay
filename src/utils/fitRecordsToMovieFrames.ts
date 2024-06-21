import etro from 'etro'
import { FitRecord } from './parseFit'
import { scalePixelValue } from './movieSizer'


export const fitRecordsToSpeedMovieFrames = (records: FitRecord[]): etro.layer.Text[] => {
  return records.map((record) => new etro.layer.Text({
    startTime: record.timer_time,
    duration: 1,
    text: `${Math.floor(record.speed)} km/h`,
    x: scalePixelValue(60),
    y: scalePixelValue(1080) - scalePixelValue(120),
    font: `${scalePixelValue(80)}px "Roboto Mono"`,
  }))
}


export const fitRecordsToPowerMovieFrames = (records: FitRecord[], offsetX?: number, offsetY?: number,): etro.layer.Text[] => {
  return records.map((record) => new etro.layer.Text({
    startTime: record.timer_time,
    duration: 1,
    text: `${Math.floor(record.power)} W`,
    x: scalePixelValue(60) + scalePixelValue(offsetX ?? 0),
    y: scalePixelValue(1080) - scalePixelValue(120) - scalePixelValue(offsetY ?? 0),
    font: `${scalePixelValue(80)}px "Roboto Mono"`,
  }))
}
