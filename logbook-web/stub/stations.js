export default [
  {
    when: ({ endpoint }) => endpoint === "GET /api/stations",
    then: () => [
      { id: 1, name: "Enghien" },
      { id: 2, name: "Namur" },
      { id: 3, name: "Bruxelles-Midi" },
      { id: 4, name: "Anvers" },
    ],
  },
  {
    when: ({ endpoint }) => endpoint === "POST /api/stations",
    then: () => ({
      id: 5,
      name: "Gand St-Pierre",
    }),
  },
]
