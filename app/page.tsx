"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Play, Pause, MapPin, Globe } from "lucide-react"

interface Location {
  id: string
  name: string
  country: string
  lat: number
  lng: number
  streamUrl: string
  timezone: string
}

const locations: Location[] = [
  {
    id: "canada",
    name: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lng: -79.3832,
    streamUrl: "https://your-video-url.com/canada-stream.mp4", // Replace with your video URL
    timezone: "EST",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    lat: 13.7563,
    lng: 100.5018,
    streamUrl: "https://your-video-url.com/bangkok-stream.mp4", // Replace with your video URL
    timezone: "ICT",
  },
  {
    id: "malaysia",
    name: "Kuala Lumpur",
    country: "Malaysia",
    lat: 3.139,
    lng: 101.6869,
    streamUrl: "https://your-video-url.com/malaysia-stream.mp4", // Replace with your video URL
    timezone: "MYT",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    streamUrl: "https://your-video-url.com/dubai-stream.mp4", // Replace with your video URL
    timezone: "GST",
  },
  {
    id: "vietnam",
    name: "Ho Chi Minh City",
    country: "Vietnam",
    lat: 10.8231,
    lng: 106.6297,
    streamUrl: "https://your-video-url.com/vietnam-stream.mp4", // Replace with your video URL
    timezone: "ICT",
  },
]

export default function WorldMapStreams() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const getLocationPosition = (lat: number, lng: number) => {
    // Convert latitude/longitude to pixel coordinates on a 2D map
    // Map dimensions: 800x400 (2:1 aspect ratio for world map)
    const x = ((lng + 180) / 360) * 800
    const y = ((90 - lat) / 180) * 400
    return { x, y }
  }

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location)
    setIsPlaying(false)
  }

  const closeModal = () => {
    setSelectedLocation(null)
    setIsPlaying(false)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-cyan-400 animate-spin" style={{ animationDuration: "8s" }} />
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                IQI Global Office
              </h1>
              <Globe
                className="w-8 h-8 text-cyan-400 animate-spin"
                style={{ animationDuration: "8s", animationDirection: "reverse" }}
              />
            </div>
            <p className="text-cyan-300 mt-2">Click locations to explore live camera feeds</p>
          </div>

          <div className="relative mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-inner bg-[#1fb6d4]">
                {/* World Map SVG */}
                <svg viewBox="0 0 800 400" className="w-full h-full" style={{ background: "#1fb6d4" }}>
                  {/* North America */}
                  <path
                    d="M50 80 Q60 70 80 75 L120 70 Q140 65 160 70 L180 75 Q200 80 220 85 L240 90 Q250 100 245 120 L240 140 Q235 160 220 170 L200 175 Q180 180 160 175 L140 170 Q120 165 100 160 L80 155 Q60 150 50 140 L45 120 Q40 100 50 80 Z"
                    fill="#84cc16"
                  />
                  {/* South America */}
                  <path
                    d="M180 200 Q190 190 200 195 L210 200 Q220 210 225 230 L230 250 Q235 270 230 290 L225 310 Q220 330 210 340 L200 345 Q190 350 180 345 L170 340 Q160 335 155 320 L150 300 Q145 280 150 260 L155 240 Q160 220 170 210 Q175 200 180 200 Z"
                    fill="#84cc16"
                  />
                  {/* Europe */}
                  <path
                    d="M380 90 Q390 85 400 90 L420 95 Q440 100 450 110 L455 130 Q450 150 440 160 L420 165 Q400 170 380 165 L360 160 Q350 150 355 130 L360 110 Q370 95 380 90 Z"
                    fill="#84cc16"
                  />
                  {/* Africa */}
                  <path
                    d="M360 180 Q380 175 400 180 L420 185 Q440 190 450 210 L455 230 Q460 250 455 270 L450 290 Q445 310 430 320 L410 325 Q390 330 370 325 L350 320 Q330 315 325 295 L320 275 Q315 255 320 235 L325 215 Q330 195 345 185 Q355 180 360 180 Z"
                    fill="#84cc16"
                  />
                  {/* Asia */}
                  <path
                    d="M480 70 Q500 65 520 70 L540 75 Q560 80 580 85 L600 90 Q620 95 640 100 L660 105 Q680 110 690 130 L685 150 Q680 170 670 180 L650 185 Q630 190 610 185 L590 180 Q570 175 550 170 L530 165 Q510 160 500 140 L495 120 Q490 100 480 70 Z"
                    fill="#84cc16"
                  />
                  {/* Australia */}
                  <path
                    d="M580 280 Q600 275 620 280 L640 285 Q660 290 670 310 L665 330 Q660 350 640 355 L620 360 Q600 365 580 360 L560 355 Q540 350 535 330 L540 310 Q545 290 560 285 Q570 280 580 280 Z"
                    fill="#84cc16"
                  />
                  {/* Additional islands and details */}
                  <circle cx="720" cy="140" r="8" fill="#84cc16" /> {/* Japan */}
                  <circle cx="680" cy="200" r="6" fill="#84cc16" /> {/* Philippines */}
                  <circle cx="650" cy="220" r="5" fill="#84cc16" /> {/* Indonesia */}
                  <circle cx="750" cy="320" r="10" fill="#84cc16" /> {/* New Zealand */}
                  <circle cx="320" cy="250" r="4" fill="#84cc16" /> {/* Madagascar */}
                  <circle cx="340" cy="120" r="6" fill="#84cc16" /> {/* UK */}
                  <circle cx="100" cy="60" r="8" fill="#84cc16" /> {/* Greenland */}
                </svg>

                {/* Location markers */}
                {locations.map((location) => {
                  const pos = getLocationPosition(location.lat, location.lng)

                  return (
                    <button
                      key={location.id}
                      onClick={() => handleLocationClick(location)}
                      onMouseEnter={() => setHoveredLocation(location.id)}
                      onMouseLeave={() => setHoveredLocation(null)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                      style={{
                        left: `${(pos.x / 800) * 100}%`,
                        top: `${(pos.y / 400) * 100}%`,
                      }}
                    >
                      <div className="relative">
                        {/* Enhanced pulsing rings */}
                        <div
                          className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-60"
                          style={{ animationDuration: "2s" }}
                        ></div>
                        <div
                          className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40 delay-300"
                          style={{ animationDuration: "2s" }}
                        ></div>

                        {/* Main marker with gradient and glow */}
                        <div
                          className={`relative w-8 h-8 rounded-full border-3 border-white shadow-2xl transition-all duration-300 ${
                            hoveredLocation === location.id ? "scale-125" : "scale-100"
                          } bg-gradient-to-br from-cyan-400 to-blue-600`}
                        >
                          <div className="absolute inset-2 bg-gradient-to-br from-white to-cyan-200 rounded-full"></div>
                          <MapPin className="absolute inset-0 w-4 h-4 m-auto text-blue-600" />
                        </div>

                        {/* Enhanced tooltip */}
                        <div
                          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                            hoveredLocation === location.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                          }`}
                        >
                          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-3 rounded-xl text-sm whitespace-nowrap shadow-2xl border border-white/20 backdrop-blur-sm">
                            <div className="font-bold text-cyan-300">{location.name}</div>
                            <div className="text-xs text-slate-300">
                              {location.country} • {location.timezone}
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {locations.map((location) => (
              <Card
                key={location.id}
                className="cursor-pointer group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-cyan-400/50 shadow-xl hover:shadow-2xl"
                onClick={() => handleLocationClick(location)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">LIVE</span>
                  </div>
                  <CardTitle className="text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {location.name}
                  </CardTitle>
                  <p className="text-sm text-slate-300">{location.country}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400 font-medium">{location.timezone}</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-lg"
                  >
                    Join Live Experience
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {selectedLocation.name}, {selectedLocation.country}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Live Camera Feed
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-cyan-400">{selectedLocation.timezone}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closeModal} className="text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <video
                className="w-full h-[400px] lg:h-[500px] object-cover"
                src={selectedLocation.streamUrl}
                controls={false}
                autoPlay={isPlaying}
                muted
                loop
              />

              {/* Enhanced play/pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={togglePlayback}
                  className="bg-black/60 hover:bg-black/80 text-white rounded-full w-20 h-20 backdrop-blur-sm border border-white/20 shadow-2xl transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                </Button>
              </div>

              {/* Enhanced status indicator */}
              <div className="absolute top-6 left-6 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>

              {/* Location info overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm text-white p-4 rounded-xl border border-white/10">
                <h3 className="font-bold text-lg mb-1">{selectedLocation.name}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
