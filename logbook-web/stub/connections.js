export default [
  {
    when: ({ endpoint }) => /GET \/api\/connections\/\d+/.test(endpoint),
    then: () => ({
      id: 1,
      departure: { id: 1, name: "Enghien" },
      departureTime: 30960000,
      arrival: { id: 3, name: "Bruxelles-Midi" },
      arrivalTime: 33840000,
    }),
  },
  {
    when: ({ endpoint }) => endpoint === "GET /api/connections",
    then: () => [
      {
        id: 1,
        departure: { id: 1, name: "Enghien" },
        departureTime: 30960000,
        arrival: { id: 3, name: "Bruxelles-Midi" },
        arrivalTime: 33840000,
      },
      {
        id: 2,
        departure: { id: 2, name: "Namur" },
        departureTime: 61920000,
        arrival: { id: 1, name: "Enghien" },
        arrivalTime: 62920000,
      },
    ],
  },
  {
    when: ({ endpoint }) => endpoint === "POST /api/connections",
    then: () => ({
      id: 3,
      departure: { id: 1, name: "Enghien" },
      departureTime: 43200000,
      arrival: { id: 3, name: "Bruxelles-Midi" },
      arrivalTime: 45000000,
    }),
  },
]
