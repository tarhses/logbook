export default [
  {
    when: ({ endpoint }) => endpoint === "GET /api/rides",
    then: () => [
      {
        id: 1,
        connection: {
          id: 1,
          departure: { id: 1, name: "Enghien" },
          departureTime: 30960000,
          arrival: { id: 3, name: "Bruxelles-Midi" },
          arrivalTime: 33840000,
        },
        date: 1680566400000,
        delay: 360000,
        ticketControl: false,
      },
      {
        id: 2,
        connection: {
          id: 1,
          departure: { id: 1, name: "Enghien" },
          departureTime: 30960000,
          arrival: { id: 3, name: "Zaventem" },
          arrivalTime: 33840000,
        },
        date: 1680566400000,
        delay: 0,
        ticketControl: false,
      },
      {
        id: 3,
        connection: {
          id: 1,
          departure: { id: 1, name: "Zaventem" },
          departureTime: 30960000,
          arrival: { id: 3, name: "Enghien" },
          arrivalTime: 33840000,
        },
        date: 1680480000000,
        delay: 0,
        ticketControl: true,
      },
      {
        id: 4,
        connection: {
          id: 1,
          departure: { id: 1, name: "Enghien" },
          departureTime: 30960000,
          arrival: { id: 3, name: "Namur" },
          arrivalTime: 33840000,
        },
        date: 1680393600000,
        delay: 180000,
        ticketControl: false,
      },
    ],
  },
  {
    when: ({ endpoint }) => endpoint === "POST /api/rides",
    then: () => ({
      id: 1,
      connection: {
        id: 1,
        departure: { id: 1, name: "Enghien" },
        departureTime: 30960000,
        arrival: { id: 3, name: "Bruxelles-Midi" },
        arrivalTime: 33840000,
      },
      date: 1680393600000,
      delay: 360000,
      ticketControl: false,
    }),
  },
]
