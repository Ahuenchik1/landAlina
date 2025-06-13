const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Настройка CORS
app.use(cors({
  origin: ['https://land-alina.ru', 'http://land-alina.ru'],
  methods: ['POST'],
  credentials: true
}))

// Ограничение количества запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // максимум 5 запросов с одного IP
  message: { error: 'Слишком много запросов. Пожалуйста, подождите 15 минут.' }
})

app.use(express.json())
app.use('/api/send-form', limiter)

// Функция для отправки сообщения в Telegram
async function sendTelegramMessage(message) {
  try {
    console.log('Sending message to Telegram:', message)
    const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Telegram API error:', error)
      throw new Error(error.description || 'Ошибка отправки сообщения')
    }

    const result = await response.json()
    console.log('Message sent successfully:', result)
    return true
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}

// Обработчик для формы квиза
app.post('/api/send-form/quiz', async (req, res) => {
  try {
    console.log('Received quiz form data:', req.body)
    const { answers, formData } = req.body

    // Валидация данных
    if (!answers || !formData) {
      console.error('Missing required data:', { answers, formData })
      return res.status(400).json({ error: 'Отсутствуют обязательные данные' })
    }

    // Проверяем наличие всех ответов
    const requiredAnswers = ['question1', 'question2', 'question3', 'question4', 'question5']
    const missingAnswers = requiredAnswers.filter(q => !answers[q])
    if (missingAnswers.length > 0) {
      console.error('Missing answers:', missingAnswers)
      return res.status(400).json({ error: 'Не все вопросы были отвечены' })
    }

    const questions = [
      'Какой тип лендинга вам нужен?',
      'У вас уже есть фирменный стиль или нужно его разработать?',
      'Какие элементы важны для вашего лендинга?',
      'Какой результат вы хотите получить от лендинга?',
      'Насколько срочно вам нужен лендинг?'
    ]

    const message = `
<b>Новые ответы на квиз</b>

<b>Вопрос 1:</b> ${questions[0]}
<b>Ответ:</b> ${answers.question1}

<b>Вопрос 2:</b> ${questions[1]}
<b>Ответ:</b> ${answers.question2}

<b>Вопрос 3:</b> ${questions[2]}
<b>Ответ:</b> ${answers.question3}

<b>Вопрос 4:</b> ${questions[3]}
<b>Ответ:</b> ${answers.question4}

<b>Вопрос 5:</b> ${questions[4]}
<b>Ответ:</b> ${answers.question5}

<b>Контактные данные:</b>
<b>Имя:</b> ${formData.name}
<b>Телефон:</b> ${formData.countryCode}${formData.phone}
<b>Email:</b> ${formData.email || 'Не указан'}
<b>Сообщение:</b> ${formData.message || 'Не указано'}
<b>Предпочтительный способ связи:</b> ${formData.contactMethod}
    `.trim()

    await sendTelegramMessage(message)
    console.log('Quiz form processed successfully')
    res.json({ success: true })
  } catch (error) {
    console.error('Error processing quiz form:', error)
    res.status(500).json({ error: 'Ошибка при отправке формы' })
  }
})

// Обработчик для контактной формы
app.post('/api/send-form/contact', async (req, res) => {
  try {
    console.log('Received contact form data:', req.body)
    const { formData } = req.body

    // Валидация данных
    if (!formData) {
      console.error('Missing form data')
      return res.status(400).json({ error: 'Отсутствуют данные формы' })
    }

    const message = `
<b>Новая заявка с сайта</b>

<b>Имя:</b> ${formData.name}
<b>Телефон:</b> ${formData.countryCode}${formData.phone}
<b>Email:</b> ${formData.email || 'Не указан'}
<b>Сообщение:</b> ${formData.message || 'Не указано'}
<b>Способ связи:</b> ${formData.contactMethod}
    `.trim()

    await sendTelegramMessage(message)
    console.log('Contact form processed successfully')
    res.json({ success: true })
  } catch (error) {
    console.error('Error processing contact form:', error)
    res.status(500).json({ error: 'Ошибка при отправке формы' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
}) 