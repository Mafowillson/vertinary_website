import { useState } from 'react'
import { FiMessageCircle, FiX } from 'react-icons/fi'

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <FiX className="w-6 h-6" />
        ) : (
          <div className="relative">
            <FiMessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <span className="text-[6px]">🧠</span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiMessageCircle className="w-5 h-5" />
              <span className="font-semibold">Chat Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="text-center text-gray-500 text-sm py-8">
              <p>Chat support coming soon!</p>
              <p className="mt-2">Feel free to contact us via our social media links.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FloatingChat
