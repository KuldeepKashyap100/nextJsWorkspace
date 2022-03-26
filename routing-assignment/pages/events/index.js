import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import {getAllEvents} from "../../data/dummy-data";
import {useRouter} from "next/router";


function EventsPage() {
    const allEvents = getAllEvents();
    const router = useRouter();
    const findEventsHandler = (selectedYear, selectedMonth) => {
        const fullPath = `/events/${selectedYear}/${selectedMonth}`;
        router.push(fullPath);
    }
    return (
        <div>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={allEvents} />
        </div>
    );
}

export default EventsPage;