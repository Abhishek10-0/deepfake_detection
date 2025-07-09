import { useState } from 'react'
import { motion } from 'framer-motion'
import illustration from '../assets/ai-illustration.svg'

const VideoUploader = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setResult(null)
    setError(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setResult(null)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a video file')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.status === 'error') throw new Error(data.error || 'Unknown error')

      setResult(data)
    } catch (err) {
      console.error('API Error:', err)
      setError(err.message || 'An error occurred while processing the video')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 z-10"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors duration-200 ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img src={illustration} alt="Upload" className="w-16 h-16 mb-2 opacity-80" />
          <label
            htmlFor="video-upload"
            className="block text-base font-semibold text-gray-700 mb-2 cursor-pointer"
          >
            {file ? file.name : 'Drag & drop or click to upload a video'}
          </label>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${
            loading || !file
              ? 'bg-indigo-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
              Processing...
            </span>
          ) : 'Check for Deepfake'}
        </button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          <strong>Error:</strong> {error}
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-6 rounded-2xl shadow-lg flex flex-col items-center ${
            ['real', 'genuine'].includes(result.result.toLowerCase())
              ? 'bg-green-50 border border-green-400 text-green-800'
              : 'bg-red-50 border border-red-400 text-red-800'
          }`}
        >
          <img
            src={['real', 'genuine'].includes(result.result.toLowerCase()) ? illustration : undefined}
            alt="Result Icon"
            className="w-12 h-12 mb-2"
            style={{ display: ['real', 'genuine'].includes(result.result.toLowerCase()) ? 'block' : 'none' }}
          />
          <h2 className="text-2xl font-bold mb-2">Result: {result.result}</h2>
          <p className="text-lg">Confidence: <span className="font-semibold">{(result.confidence * 100).toFixed(2)}%</span></p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default VideoUploader
