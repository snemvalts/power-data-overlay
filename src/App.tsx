import { useState } from 'react'
import './App.css'
import { UploadFile } from './components/UploadFile'
import { FitRecord, parseFit } from './utils/parseFit'
import { MoviePreview } from './components/MoviePreview'

export const App = () => {
  const [parsedFit, setParsedFit] = useState<FitRecord[] | null>(null)

  const handleUpload = async (file: ArrayBuffer) => {
    setParsedFit(await parseFit(file))
  }

  return (
    <>
      <h1>power-data-overlay</h1>
      {parsedFit === null && <Intro />}
      {parsedFit === null && <UploadFile onUpload={handleUpload} />}
      {parsedFit && <MoviePreview records={parsedFit} />}
    </>
  )
}

const Intro = () => (
  <div>
    <p>
      Get the video overlay for a .fit activity showcasing cycling speed and
      power
    </p>
    <ol>
      <li>Get the .FIT file for an activity</li>
      <li>
        Trim the activity with something like{' '}
        <a href="https://www.fitfiletools.com/#/remover#view">FIT file tools</a>
        .
      </li>
      <li>Upload the trimmed activity here</li>
    </ol>
    <p>
      The renderer itself is very slow, so small .fit files {'<1min'} are
      recommended
    </p>
  </div>
)
