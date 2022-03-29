import EventList from "../components/events/event-list";
import Head from "next/head";

function HomePage(props) {
    return (
        <div>
            <Head>
                <title>NextJs Events</title>
                {/* {this meta tag is read by crawlers} */}
                <meta name="description" content="Find a lot of great events that allow you to evolve..." />
            </Head>
            <EventList items={props.featuredEvents} />
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch("http://localhost:4000/events/featured");
    const events = await response.json();

    return {
        props: {featuredEvents: events},
        revalidate: 1800
    }
}

export default HomePage;