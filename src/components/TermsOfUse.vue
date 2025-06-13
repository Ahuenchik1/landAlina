<template>
  <div class="terms-of-use">
    <div class="container">
      <h1 class="terms-of-use__title">Условия использования</h1>
      
      <div class="terms-of-use__content">
        <section class="terms-of-use__section">
          <h2>1. Общие положения</h2>
          <p>Настоящие условия использования регулируют отношения между пользователем сайта и Land-Alina. Используя наш сайт, вы соглашаетесь с этими условиями.</p>
          <p>Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сайт.</p>
        </section>

        <section class="terms-of-use__section">
          <h2>2. Использование сайта</h2>
          <p>Вы соглашаетесь использовать сайт только в законных целях и способами, которые не нарушают права других лиц или ограничения использования сайта.</p>
          <p>Запрещается:</p>
          <ul>
            <li>Использовать сайт для любых незаконных целей</li>
            <li>Пытаться получить несанкционированный доступ к сайту</li>
            <li>Нарушать работу сайта или его безопасность</li>
            <li>Передавать вредоносное программное обеспечение</li>
            <li>Собирать информацию о других пользователях</li>
          </ul>
        </section>

        <section class="terms-of-use__section">
          <h2>3. Интеллектуальная собственность</h2>
          <p>Весь контент на сайте, включая тексты, изображения, логотипы, дизайн и другие материалы, является интеллектуальной собственностью Land-Alina и защищен законами об авторском праве.</p>
          <p>Запрещается копировать, распространять или использовать контент сайта без письменного разрешения.</p>
        </section>

        <section class="terms-of-use__section">
          <h2>4. Услуги</h2>
          <p>Мы оставляем за собой право изменять, приостанавливать или прекращать предоставление услуг в любое время без предварительного уведомления.</p>
          <p>Цены на услуги могут быть изменены без предварительного уведомления.</p>
        </section>

        <section class="terms-of-use__section">
          <h2>5. Ответственность</h2>
          <p>Land-Alina не несет ответственности за:</p>
          <ul>
            <li>Любые убытки, возникшие в результате использования или невозможности использования сайта</li>
            <li>Неточности в информации, представленной на сайте</li>
            <li>Действия третьих лиц, связанные с использованием сайта</li>
            <li>Перебои в работе сайта или технические проблемы</li>
          </ul>
        </section>

        <section class="terms-of-use__section">
          <h2>6. Изменения условий</h2>
          <p>Мы оставляем за собой право изменять эти условия в любое время. Изменения вступают в силу с момента их публикации на сайте.</p>
          <p>Продолжая использовать сайт после внесения изменений, вы соглашаетесь с новыми условиями.</p>
        </section>

        <section class="terms-of-use__section">
          <h2>7. Контакты</h2>
          <p>По всем вопросам, связанным с использованием сайта, вы можете связаться с нами:</p>
          <ul>
            <li>Телефон: +7-996-744-32-18</li>
            <li>Email: info@land-alina.ru</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.terms-of-use {
  padding: 8rem 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

.terms-of-use__title {
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 6rem;
  text-align: center;
}

.terms-of-use__content {
  max-width: 120rem;
  margin: 0 auto;
}

.terms-of-use__section {
  margin-bottom: 4rem;
}

.terms-of-use__section h2 {
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--accent-color);
}

.terms-of-use__section p {
  font-size: 2.4rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.terms-of-use__section ul {
  list-style: disc;
  margin-left: 2rem;
  margin-bottom: 2rem;
}

.terms-of-use__section li {
  font-size: 2.4rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .terms-of-use {
    padding: 4rem 0;
  }

  .terms-of-use__title {
    font-size: 3.2rem;
    margin-bottom: 3rem;
  }

  .terms-of-use__section h2 {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
  }

  .terms-of-use__section p,
  .terms-of-use__section li {
    font-size: 1.8rem;
  }
}
</style> 