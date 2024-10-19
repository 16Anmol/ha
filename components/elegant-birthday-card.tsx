'use client'

import React, { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Heart, Stars, Gift, Music } from 'lucide-react'

export function ElegantBirthdayCardComponent() {
  const [showMessage, setShowMessage] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
      launchFireworks()
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const launchFireworks = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min:number, max:number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)
  }

  const toggleMusic = () => {
    const audio = document.getElementById('birthdaySong') as HTMLAudioElement
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-300 to-indigo-300 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="relative h-80 bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=400&width=800')"}}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center animate-pulse">
              Happy Birthday Jiya!
            </h1>
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleMusic}
              className="p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all duration-300"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              <Music className={`w-6 h-6 ${isPlaying ? 'text-pink-500' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-8 text-center">
            <p className="text-3xl font-serif italic text-gray-800 mb-4">My Dearest Jiya,</p>
            <p className="text-xl text-gray-600 leading-relaxed">
              On this special day, I want to celebrate the amazing person you are. Your smile brightens my world, your laughter fills my heart with joy, and your love makes every day an adventure.
            </p>
          </div>
          {showMessage && (
            <div className="space-y-6 opacity-0 animate-fade-in-up">
              <p className="text-2xl text-center text-pink-600 font-medium">
                May this year bring you all the happiness, success, and love you deserve. You&apos;re not just a year older, but a year more wonderful!
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={launchFireworks}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:from-pink-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center"
                >
                  <Gift className="mr-2" /> Birthday Surprise!
                </button>
                <button
                  onClick={() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full font-semibold shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                >
                  <Stars className="mr-2" /> Sprinkle Some Magic!
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 p-6 flex items-center justify-center">
          <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mr-3">I Love You</p>
          <Heart className="text-red-500 animate-bounce" size={40} />
        </div>
      </div>
      <audio id="birthdaySong" loop>
        <source src="/path-to-your-birthday-song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}