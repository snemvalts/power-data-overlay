import FitParser from 'fit-file-parser'


export type FitRecord = {
  altitude: number
  cadence: number
  distance: number
  elapsed_time: number
  heart_rate: number
  position_lat: number
  position_long: number
  power: number
  speed: number
  temperature: number
  timer_time: number
  timestamp: Date
}


export const parseFit = (buffer: ArrayBuffer): Promise<FitRecord[]> => {
  const fitParser = new FitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    temperatureUnit: 'kelvin',
    elapsedRecordField: true,
    mode: 'cascade',
  })



  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fitParser.parse(buffer, (err: unknown, data: any) => {
      if (err) {
        return reject(err)
      }


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve(data.activity.sessions.map((session: any) => session.laps.map((lap: any) => lap.records)).flat(3))
    })
  })
}
