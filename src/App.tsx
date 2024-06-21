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
      {parsedFit === null && <UploadFile onUpload={handleUpload} />}
      {parsedFit && <MoviePreview records={parsedFit} />}
    </>
  )
}
