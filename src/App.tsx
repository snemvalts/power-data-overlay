import { useState } from 'react'
import './App.css'
import { UploadFile } from './components/UploadFile'
import { FitRecord, parseFit } from './utils/parseFit'

export const App = () => {
  const [parsedFit, setParsedFit] = useState<FitRecord[] | null>(null)

  const handleUpload = async (file: ArrayBuffer) => {
    setParsedFit(await parseFit(file))
  }

  return (
    <>
      {parsedFit === null && <UploadFile onUpload={handleUpload} />}
      {parsedFit?.map((record) => (
        <code key={record.timestamp.toISOString()}>
          {JSON.stringify(record)}
        </code>
      ))}
    </>
  )
}
