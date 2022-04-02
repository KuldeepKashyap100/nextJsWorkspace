import classes from './newsletter-registration.module.css';
import {useRef} from "react";
import {getNotificationContext} from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationContext = getNotificationContext();

  function registrationHandler(event) {
    event.preventDefault();

    notificationContext.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter!",
      status: "pending"
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) return response.json();
      return response.json().then(data => {throw new Error(data.message)});
    })
    .then(() => {
      notificationContext.showNotification({
        title: "Success!",
        message: "Successfully registered for newsletter!",
        status: "success"
      });
    })
    .catch((error) => {
      notificationContext.showNotification({
        title: "Error!",
        message: error.message || "something went wrong!",
        status: "error"
      });
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button onClick={registrationHandler}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
