# Logbook - Changelog

## v0.3.0 - 2023-05-23

Mostly user interface improvements and code refactoring.

### Web frontend

- **Feature** Pico CSS is now used instead of Shoelace components.
- **Feature** Errors and loadings are now gracefully handled.

### Server

- **Feature** Endpoints now support the PUT method for editing stations, rides, and connections.

## v0.2.0 - 2023-04-25

Small improvements.

### Web frontend

- **Feature** Rides are now grouped by dates on the ride list page.
- **Feature** Stations are now sorted by alphabetical order on the connection selection page.
- **Feature** Connections are now sorted by departure time on the connection selection page.
- **Feature** Arrival time is now displayed on the new ride page. In addition, it automatically updates given the inputted delay.

### Server

- **Feature** Ride dates are now normalized in the database. It means that day time is stripped from the input leaving only the date at midnight UTC.

## v0.1.0 - 2023-04-21

Initial release. This is a minimum viable product to log train rides only. There is no way to update nor delete any record, the user interface is "functional" to say the least, and there is not database index. Yet.
