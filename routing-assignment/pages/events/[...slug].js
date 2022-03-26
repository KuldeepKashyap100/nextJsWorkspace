import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getFilteredEvents } from "../../data/dummy-data";
import { useRouter } from "next/router";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlter from "../../components/ui/error-alert";

function FilteredEvents() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className="center">Loading...</p>;

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

  const filteredEvents = getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

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

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <div>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEvents;
