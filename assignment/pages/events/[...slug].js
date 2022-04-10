import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getFilteredEvents } from "../../data/dummy-data";
import { useRouter } from "next/router";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlter from "../../components/ui/error-alert";
import {useState, useEffect} from "react";
import useSWR from "swr";
import Head from "next/head";


function FilteredEvents(props) {
  const router = useRouter();
  const filterData = router.query.slug;
  const [filteredEvents, setFilteredEvents] = useState([]);

  if (!filterData) return <p className="center">Loading...</p>;

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  const {data, error} = useSWR(`http://localhost:4000/events/${filterYear}/${filterMonth}`,(url) => fetch(url).then(res => res.json()));

  useEffect(() => {
    if(!data) return;
    setFilteredEvents(data);
  }, [data]);


  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12 || error || props.hasError
  )
    return (
      <>
        <ErrorAlter>
          <p>Invalid Filter. Please adjust your values.</p>
        </ErrorAlter>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );


  if (!filteredEvents || filteredEvents.length === 0)
    return (
      <>
        <ErrorAlter>
          <p>No Events Found for choosen filter.</p>
        </ErrorAlter>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  const date = new Date(props.filterYear, props.filterMonth - 1);

  return (
    <div>
      <Head>
          <title>Filtered Events</title>
          <meta name="description" content={`All Events For ${filterMonth}/${filterYear}.`} />
      </Head>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const filterData = params.slug;

  const filterYear = +filterData[0];
  const filterMonth = +filterData[1];

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth < 1 ||
    filterMonth > 12
  )
    return {
      props: {hasError: true}
      // notFound: true,
      // redirect: {
      //   destination: "/error"
      // }
    };

  const response = await fetch(`http://localhost:4000/events/${filterYear}/${filterMonth}`);
  const events = await response.json();

  return {
    props: {
      events,
      filterYear,
      filterMonth
    }
  };
}

export default FilteredEvents;