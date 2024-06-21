import { ChangeEvent } from 'react'

type Props = {
  onUpload: (file: ArrayBuffer) => unknown
}
export const UploadFile = ({ onUpload }: Props) => {
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    onUpload(await file.arrayBuffer())
  }
  return (
    <>
      <div style={{ paddingBottom: '10px' }}>Upload .fit file:</div>
      <input type="file" onChange={handleChange} accept=".fit" />
    </>
  )
}
