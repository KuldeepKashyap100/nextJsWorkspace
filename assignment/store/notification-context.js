import { createContext, useContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotifications: () => {},
  hideNotifications: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => setActiveNotification(notificationData);
  const hideNotificationHandler = () => setActiveNotification(null);

  useEffect(() => {
      if(activeNotification && (activeNotification.status === "success" || activeNotification.status === "error")) {
          const timer = setTimeout(() => {
              setActiveNotification(null);
          }, 3000);
          return () => clearTimeout(timer);
      }
  }, [activeNotification]);

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const getNotificationContext = () => useContext(NotificationContext);

export default NotificationContext;
