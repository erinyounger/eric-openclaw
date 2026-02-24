#!/bin/bash

# 南京天气推送脚本

# 获取天气数据
WEATHER=$(curl -s "https://api.open-meteo.com/v1/forecast?latitude=32.06&longitude=118.79&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia/Shanghai&lang=zh")

# 解析数据
TEMP=$(echo "$WEATHER" | grep -o '"temperature_2m":[0-9.]*' | cut -d: -f2)
HUMIDITY=$(echo "$WEATHER" | grep -o '"relative_humidity_2m":[0-9]*' | cut -d: -f2)
FEELS_LIKE=$(echo "$WEATHER" | grep -o '"apparent_temperature":[0-9.]*' | cut -d: -f2)
WIND=$(echo "$WEATHER" | grep -o '"wind_speed_10m":[0-9.]*' | cut -d: -f2)
CODE=$(echo "$WEATHER" | grep -o '"weather_code":[0-9]*' | cut -d: -f2)

# 天气代码转中文
case $CODE in
  0) EMOJI="☀️ 晴" ;;
  1|2|3) EMOJI="⛅ 多云" ;;
  45|48) EMOJI="🌫️ 雾" ;;
  51|53|55) EMOJI="🌧️ 毛毛雨" ;;
  61|63|65) EMOJI="🌧️ 雨" ;;
  71|73|75) EMOJI="❄️ 雪" ;;
  80|81|82) EMOJI="🌧️ 阵雨" ;;
  95|96|99) EMOJI="⚡ 雷暴" ;;
  *) EMOJI="🌤️ " ;;
esac

# 格式化消息
MESSAGE="🌤️ 南京天气

$EMOJI
温度: ${TEMP}°C
体感: ${FEELS_LIKE}°C
湿度: ${HUMIDITY}%
风速: ${WIND} km/h

更新时间: $(date '+%Y-%m-%d %H:%M')"

# 保存到文件
echo "$MESSAGE" > /workspaces/eric-openclaw/weather_push.txt
echo "更新于: $(date)" >> /workspaces/eric-openclaw/weather_push.txt

echo "$MESSAGE"
