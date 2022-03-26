import {useRouter} from "next/router";
import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import {getEventById} from "../../../data/dummy-data";
import ErrorAlter from "../../../components/ui/error-alert";


function EventDetailPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if(!event) return <ErrorAlter><p>No event Found</p></ErrorAlter>;


    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                {event.description}
            </EventContent>
        </>
    );
}

export default EventDetailPage;