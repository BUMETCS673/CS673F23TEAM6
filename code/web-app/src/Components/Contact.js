import React from 'react';

const Contact = () => {
  return (
    <div id="contact" className="pb-32 contact-page-wrapper">
      <h1 className="primary-heading">Have a Question? Contact Us</h1>
      <div className="contact-form-container">
        <input type="text" placeholder="xyz@bu.edu" />
        <button className="primary-button">Submit</button>
      </div>
    </div>
  );
};

export default Contact;
