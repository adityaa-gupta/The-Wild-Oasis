// import styled from 'styled-components';
import BookingRow from "./BookingRow";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useBookings } from "./useBookings";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";
import { useUser } from "../authentication/useUser";
function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  // console.log(bookings, 34, "bookingsTable");
  const { user } = useUser();
  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resource={"bookings"} />;

  // VIDEO stupid JS bug, just an example of course
  // null.toUpperCase();

  return (
    <Menus>
      <Table
        columns={
          window.innerWidth > 600
            ? "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"
            : "2fr 2fr 1fr 2rem"
        }
      >
        <Table.Header>
        {window.innerWidth > 600 &&  <div>Cabin</div>}
          <div>Guest</div>
          {window.innerWidth > 600 && <div>Dates</div>}
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        {/* {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))} */}

        {/* Render props! */}
        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
            // {console.log(object)}
          )}
        />

        <Table.Footer>
          {/* {user.user_metadata.role === "guest" && <p>i am guest</p>} */}
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <BookingTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default BookingTable;
