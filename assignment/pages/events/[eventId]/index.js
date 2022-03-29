import {useRouter} from "next/router";
import EventContent from "../../../components/event-detail/event-content";
import EventLogistics from "../../../components/event-detail/event-logistics";
import EventSummary from "../../../components/event-detail/event-summary";
import {getEventById} from "../../../data/dummy-data";
import ErrorAlter from "../../../components/ui/error-alert";
import Head from "next/head";


function EventDetailPage(props) {
    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);
    const {event} = props;

    if(!event) return <ErrorAlter><p>No event Found</p></ErrorAlter>;


    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                {event.description}
            </EventContent>
        </>
    );
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const response = await fetch("http://localhost:4000/events/" + eventId);
    const event = await response.json();
    return { 
        props: {
            event
        },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:4000/events/featured");
    const events = await response.json();

    const eventPaths = events.map(event => ({params: {eventId: event.id}}));

    return {
        paths: eventPaths,
        fallback: "blocking"
    };
}

export default EventDetailPage;