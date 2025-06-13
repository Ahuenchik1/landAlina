<template>
  <div class="privacy-policy">
    <div class="container">
      <h1 class="privacy-policy__title">Политика конфиденциальности</h1>
      
      <div class="privacy-policy__content">
        <section class="privacy-policy__section">
          <h2>1. Общие положения</h2>
          <p>Настоящая политика конфиденциальности описывает, как Land-Alina собирает, использует и защищает информацию, которую вы предоставляете при использовании нашего сайта.</p>
          <p>Мы стремимся обеспечить защиту вашей конфиденциальности и персональных данных. Используя наш сайт, вы соглашаетесь с условиями настоящей политики конфиденциальности.</p>
        </section>

        <section class="privacy-policy__section">
          <h2>2. Собираемая информация</h2>
          <p>Мы собираем следующую информацию:</p>
          <ul>
            <li>Имя и контактные данные (телефон, email)</li>
            <li>Информация о проекте, который вы хотите реализовать</li>
            <li>Техническая информация (IP-адрес, тип браузера, операционная система)</li>
            <li>Информация о посещении сайта (страницы, время посещения)</li>
          </ul>
        </section>

        <section class="privacy-policy__section">
          <h2>3. Использование информации</h2>
          <p>Собранная информация используется для:</p>
          <ul>
            <li>Связи с вами по вопросам вашего проекта</li>
            <li>Улучшения работы сайта</li>
            <li>Анализа посещаемости и эффективности рекламы</li>
            <li>Отправки уведомлений о новых услугах и акциях</li>
          </ul>
        </section>

        <section class="privacy-policy__section">
          <h2>4. Защита информации</h2>
          <p>Мы принимаем все необходимые меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
        </section>

        <section class="privacy-policy__section">
          <h2>5. Передача информации третьим лицам</h2>
          <p>Мы не продаем и не передаем ваши персональные данные третьим лицам, за исключением случаев, когда это необходимо для:</p>
          <ul>
            <li>Выполнения обязательств перед вами</li>
            <li>Соответствия требованиям законодательства</li>
            <li>Защиты наших прав и интересов</li>
          </ul>
        </section>

        <section class="privacy-policy__section">
          <h2>6. Ваши права</h2>
          <p>Вы имеете право:</p>
          <ul>
            <li>Получить доступ к своим персональным данным</li>
            <li>Исправить неточные данные</li>
            <li>Запросить удаление данных</li>
            <li>Отозвать согласие на обработку данных</li>
          </ul>
        </section>

        <section class="privacy-policy__section">
          <h2>7. Контакты</h2>
          <p>По всем вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:</p>
          <ul>
            <li>Телефон: +7-996-744-32-18</li>
            <li>Email: info@land-alina.ru</li>
          </ul>
        </section>

        <section class="privacy-policy__section">
          <h2>8. Изменения в политике конфиденциальности</h2>
          <p>Мы оставляем за собой право вносить изменения в настоящую политику конфиденциальности. При внесении существенных изменений мы уведомим вас об этом на сайте.</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.privacy-policy {
  padding: 8rem 0;
  background-color: var(--background-color);
  color: var(--text-color);
}

.privacy-policy__title {
  font-size: 4.8rem;
  font-weight: 700;
  margin-bottom: 6rem;
  text-align: center;
}

.privacy-policy__content {
  max-width: 120rem;
  margin: 0 auto;
}

.privacy-policy__section {
  margin-bottom: 4rem;
}

.privacy-policy__section h2 {
  font-size: 3.2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--accent-color);
}

.privacy-policy__section p {
  font-size: 2.4rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.privacy-policy__section ul {
  list-style: disc;
  margin-left: 2rem;
  margin-bottom: 2rem;
}

.privacy-policy__section li {
  font-size: 2.4rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .privacy-policy {
    padding: 4rem 0;
  }

  .privacy-policy__title {
    font-size: 3.2rem;
    margin-bottom: 3rem;
  }

  .privacy-policy__section h2 {
    font-size: 2.4rem;
    margin-bottom: 1.5rem;
  }

  .privacy-policy__section p,
  .privacy-policy__section li {
    font-size: 1.8rem;
  }
}
</style> 