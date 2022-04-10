import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import {getAllEvents} from "../../data/dummy-data";
import {useRouter} from "next/router";
import Head from "next/head";



function AllEventsPage(props) {
    const router = useRouter();
    const findEventsHandler = (selectedYear, selectedMonth) => {
        const fullPath = `/events/${selectedYear}/${selectedMonth}`;
        router.push(fullPath);
    }
    return (
        <div>
            <Head>
                <title>All Events</title>
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={props.events} />
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch("http://localhost:4000/events");
    const events = await response.json();

    return {
        props: {
            events
        },
        revalidate: 60
    };
}
 
export default AllEventsPage;