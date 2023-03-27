import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const enviarmail = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bci0ybg', 'template_n926rtm', form.current, 'IV5e9vgqASc5J77bp')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="submit" value="Send" onClick={enviarmail} />
    </form>
  );
};
