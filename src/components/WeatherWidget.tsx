'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  humidity: number;
  feelsLike: number;
  wind: number;
  code: number;
  updatedAt: string;
}

const weatherEmoji: Record<number, string> = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌧️',
  53: '🌧️',
  55: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  71: '❄️',
  73: '❄️',
  75: '❄️',
  80: '🌧️',
  81: '🌧️',
  82: '🌧️',
  95: '⚡',
  96: '⚡',
  99: '⚡',
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchWeather();
    // 每5分钟刷新一次天气
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=32.06&longitude=118.79&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Shanghai&lang=zh'
      );
      const data = await res.json();
      
      setWeather({
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        feelsLike: data.current.apparent_temperature,
        wind: data.current.wind_speed_10m,
        code: data.current.weather_code,
        updatedAt: new Date().toLocaleString('zh-CN', { 
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit'
        }),
      });
    } catch (e) {
      console.error('获取天气失败:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-3 bg-[#27272a] rounded-xl text-[#71717a]">
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm">加载天气中...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="mb-4">
      {/* 简洁版 - 收起状态 */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-[#27272a] to-[#1a1a1a] rounded-xl hover:from-[#3f3f46] hover:to-[#27272a] transition-all group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{weatherEmoji[weather.code] || '🌤️'}</span>
            <div className="text-left">
              <div className="text-[#fafafa] font-medium">南京 {weather.temp}°C</div>
              <div className="text-xs text-[#71717a]">点击查看详情</div>
            </div>
          </div>
          <svg 
            className="w-5 h-5 text-[#71717a] group-hover:text-[#22d3ee] transition-colors" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        /* 详细版 - 展开状态 */
        <div className="p-4 bg-gradient-to-br from-[#27272a] to-[#1a1a1a] rounded-xl border border-[#27272a]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{weatherEmoji[weather.code] || '🌤️'}</span>
              <div>
                <div className="text-lg font-bold text-[#fafafa]">南京</div>
                <div className="text-2xl font-bold text-[#22d3ee]">{weather.temp}°C</div>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 text-[#71717a] hover:text-[#fafafa] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center p-2 bg-[#1a1a1a] rounded-lg">
              <div className="text-[#71717a] text-xs">体感</div>
              <div className="text-[#fafafa] font-medium">{weather.feelsLike}°C</div>
            </div>
            <div className="text-center p-2 bg-[#1a1a1a] rounded-lg">
              <div className="text-[#71717a] text-xs">湿度</div>
              <div className="text-[#fafafa] font-medium">{weather.humidity}%</div>
            </div>
            <div className="text-center p-2 bg-[#1a1a1a] rounded-lg">
              <div className="text-[#71717a] text-xs">风速</div>
              <div className="text-[#fafafa] font-medium">{weather.wind} km/h</div>
            </div>
          </div>
          
          <div className="mt-3 text-center text-xs text-[#52525b]">
            更新时间: {weather.updatedAt}
          </div>
        </div>
      )}
    </div>
  );
}
