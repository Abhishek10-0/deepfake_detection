import { motion } from 'framer-motion'
import VideoUploader from './components/VideoUploader'
import illustration from './assets/ai-illustration.svg' // You can use any SVG here
import reactLogo from './assets/react.svg'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background illustration */}
      <motion.img
        src={illustration}
        alt="AI Illustration"
        className="absolute bottom-0 right-0 w-1/2 max-w-lg opacity-10 pointer-events-none select-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Hero Section */}
      <div className="z-20 flex flex-col items-center mb-10">
        <motion.img
          src={reactLogo}
          alt="React Logo"
          className="w-20 h-20 mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h1
          className="text-5xl font-extrabold text-gray-800 mb-4 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Deepfake Detection
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 max-w-2xl text-center mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Upload a video to detect whether it is <span className="font-semibold text-indigo-600">genuine</span> or a <span className="font-semibold text-red-500">deepfake</span> using advanced AI.
        </motion.p>
      </div>
      <VideoUploader />
      <footer className="mt-10 text-gray-500 text-sm z-20">
        &copy; {new Date().getFullYear()} Deepfake-AI. Powered by React & AI.
      </footer>
    </div>
  )
}

export default App
