import MainHeader from "./main-header";
import { getNotificationContext } from "../../store/notification-context";
import Notification from "../notification/notification";

function Layout(props) {
  const notificationContext = getNotificationContext();
  const activeNotification = notificationContext.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
