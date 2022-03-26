import EventItem from "./event-item";
import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <div>
      <ul className={classes.list}>
        {items.map((event) => (
          <EventItem
            key={event.id}
            title={event.title}
            id={event.id}
            location={event.location}
            image={event.image}
            date={event.date}
          />
        ))}
      </ul>
    </div>
  );
}

export default EventList;
