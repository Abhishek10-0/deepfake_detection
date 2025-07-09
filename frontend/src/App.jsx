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
      {/* Centered content group: logo/hero and uploader */}
      <div className="flex flex-1 flex-col items-center justify-center w-full">
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
      </div>
      {/* Reduced spacer to bring footer closer to upload section */}
      <div className="min-h-[24vh]" />

      <footer className="w-full bg-white bg-opacity-95 shadow-inner py-8 px-4 flex flex-col items-center z-20">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">About Us</h2>
          <p className="text-gray-700 text-center mb-2">
            Deepfake-AI is a full-stack web application that empowers users to detect deepfake videos using advanced deep learning techniques. With a modern, user-friendly interface, you can upload a video and receive a clear, confidence-scored result indicating whether the video is genuine or a deepfake.
          </p>
          <p className="text-gray-700 text-center mb-6">
            For questions, support, or to get in touch with our team, please use the contact or feedback section on this website. We welcome your feedback and inquiries!
          </p>
          {/* Team & Socials */}
          <div className="flex flex-col items-center mb-4">
            <span className="font-semibold text-gray-800 mb-1">Created by Abhishek Choudhary</span>
            <div className="flex gap-4 mt-1">
              <a href="https://www.linkedin.com/in/abhishek-choudhary-53581a256/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-indigo-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
              </a>
              <a href="https://github.com/abhishekchoudhary-ai" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-900">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          {/* Contact Section */}
          <div className="flex flex-col items-center mb-4">
            <span className="font-semibold text-gray-800 mb-1">Contact</span>
            <a href="mailto:abhishekchoudhary.ai@gmail.com" className="text-indigo-600 hover:underline">abhishekchoudhary.ai@gmail.com</a>
          </div>
          {/* Resources Section */}
          <div className="flex flex-col items-center mb-2">
            <span className="font-semibold text-gray-800 mb-1">Resources</span>
            <a href="https://github.com/abhishekchoudhary-ai/deepfake-ai" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Project Repository</a>
          </div>
        </div>
        <div className="text-gray-500 text-sm mt-4">&copy; {new Date().getFullYear()} Deepfake-AI. Powered by React & AI.</div>
      </footer>
    </div>
  )
}

export default App
