import { TELEGRAM_CONFIG } from '../config/telegram'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 секунда

export async function sendTelegramMessage(message, retries = MAX_RETRIES) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.description || 'Ошибка отправки сообщения')
    }

    return true
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return sendTelegramMessage(message, retries - 1)
    }
    throw error
  }
} 