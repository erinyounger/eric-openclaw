const https = require('https');
const fs = require('fs');

// 设置时区为东八区
process.env.TZ = 'Asia/Shanghai';

const CHAT_ID = '6433007742'; // Master 的 Telegram chat_id

// 天气代码转中文
function getWeatherEmoji(code) {
  const codes = {
    0: '☀️ 晴',
    1: '🌤️ 晴间多云',
    2: '⛅ 多云',
    3: '☁️ 阴',
    45: '🌫️ 雾',
    48: '🌫️ 雾凇',
    51: '🌧️ 轻雾',
    53: '🌧️ 中雾',
    55: '🌧️ 大雾',
    61: '🌧️ 小雨',
    63: '🌧️ 中雨',
    65: '🌧️ 大雨',
    71: '❄️ 小雪',
    73: '❄️ 中雪',
    75: '❄️ 大雪',
    80: '🌧️ 小阵雨',
    81: '🌧️ 中阵雨',
    82: '🌧️ 大阵雨',
    95: '⚡ 雷暴',
    96: '⚡ 雷暴+冰雹',
    99: '⚡ 强雷暴+冰雹'
  };
  return codes[code] || '🌤️ ';
}

async function getWeather() {
  return new Promise((resolve, reject) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=32.06&longitude=118.79&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Shanghai&lang=zh';
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const current = json.current;
          resolve({
            temp: current.temperature_2m,
            humidity: current.relative_humidity_2m,
            feelsLike: current.apparent_temperature,
            wind: current.wind_speed_10m,
            code: current.weather_code
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function formatMessage(weather) {
  const emoji = getWeatherEmoji(weather.code);
  const now = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
  
  return `🌤️ 南京天气

${emoji}
温度: ${weather.temp}°C
体感: ${weather.feelsLike}°C
湿度: ${weather.humidity}%
风速: ${weather.wind} km/h

更新时间: ${now}`;
}

async function sendToTelegram(message) {
  // 保存到文件供检查
  fs.writeFileSync('/workspaces/eric-openclaw/last_weather.json', JSON.stringify({
    message,
    timestamp: Date.now()
  }));
  console.log('天气已更新:', message);
}

async function main() {
  console.log('🌤️ 天气推送服务已启动，每30分钟推送一次...');
  
  // 立即发送一次
  try {
    const weather = await getWeather();
    const message = formatMessage(weather);
    await sendToTelegram(message);
  } catch (e) {
    console.error('获取天气失败:', e.message);
  }
  
  // 每30分钟发送一次
  setInterval(async () => {
    try {
      const weather = await getWeather();
      const message = formatMessage(weather);
      await sendToTelegram(message);
    } catch (e) {
      console.error('获取天气失败:', e.message);
    }
  }, 30 * 60 * 1000);
}

main();
