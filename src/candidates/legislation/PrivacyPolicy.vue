<template>
  <div class="privacy-policy">
    <LegislationHeader></LegislationHeader>
    <div class="privacy-policy__content simple-text">
      <h1>Privacy policy</h1>
      <section>
        <h2>
          <span>GDPR</span>
          <span>Devv AB:</span>
        </h2>
        <p>We protect our employees and our customers' integrity. Customer refers to both a registered developer and a contact person for potential employers for developers.</p>
        <p>We aim for a high level of data protection.</p>
        <p>Our data protection policy explains which data is stored and user rights.</p>
        <p>Important that everyone is taking part in our policy.</p>
      </section>
      <section>
        <h2>Devv AB is the part responsible for personal data.</h2>
        <h6>Why do we collect and register personal data?</h6>
        <ul>
          <li>To be able to complete agreements with developers and customers.</li>
          <li>Because we have a legitimate interest.</li>
        </ul>
      </section>
      <section>
        <h2>What data do we register?</h2>
        <p>For the developer: name, contact details and notified competence as well as work related experience.</p>
        <p>For employer: representative name and contact details.</p>
        <p>No information on so-called sensitive information is recorded.</p>
      </section>
      <section>
        <h2>How long do we save data?</h2>
        <p>During six months after the developer is no longer active job seekers.</p>
        <p>When prospective employers have obtained placement or reported that employment is no longer applicable.</p>
        <p>It is noted that even if the data has been deleted, some data may remain in the accounting records, where Devv AB has a legal responsibility to comply with the Accounting Act.</p>
      </section>
      <section>
        <h2>Information to third parties</h2>
        <p>To maintain adequate records, we can collaborate with third parties who can also carry the above information in relevant cases. Through an agreement, we have secured the handling of such registration.</p>
      </section>
      <section>
        <h2>Rights</h2>
        <ul>
          <li>Right to excerpt.</li>
          <li>Right to erasure.</li>
          <li>Right to data portability.</li>
        </ul>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          If you have questions, please contact Kris Ledel, CEO at
          <a href="mailto:k@devv.it">k@devv.it</a>
          .
        </p>
      </section>
      <footer>
        <h4>Devv AB</h4>
        <h5>LAST UPDATED: 2018-08-07</h5>
      </footer>
    </div>
  </div>
</template>

<script>
import LegislationHeader from '@/candidates/legislation/shared/LegislationHeader';
export default {
  components: {
    LegislationHeader
  }
};
</script>
