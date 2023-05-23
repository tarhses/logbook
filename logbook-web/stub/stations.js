export default [
  {
    when: ({ endpoint, params }) =>
      endpoint === "GET /api/stations" && !params.has("from"),
    then: () => [
      { id: 1, name: "Enghien" },
      { id: 2, name: "Namur" },
      { id: 3, name: "Bruxelles-Central" },
      { id: 4, name: "Antwerpen-Centraal" },
      { id: 5, name: "Gent-Sint-Pieters" },
      { id: 6, name: "Liège-Guillemins" },
      { id: 7, name: "Charleroi-Sud" },
      { id: 8, name: "Brugge" },
      { id: 9, name: "Leuven" },
      { id: 10, name: "Mons" },
      { id: 11, name: "Gent-Dampoort" },
      { id: 12, name: "Hasselt" },
      { id: 13, name: "Oostende" },
      { id: 14, name: "Mechelen" },
      { id: 15, name: "Aalst" },
    ],
  },
  {
    when: ({ endpoint, params }) =>
      endpoint === "GET /api/stations" && params.has("from"),
    then: () => [
      { id: 2, name: "Namur" },
      { id: 4, name: "Antwerpen-Centraal" },
      { id: 5, name: "Gent-Sint-Pieters" },
      { id: 8, name: "Brugge" },
      { id: 9, name: "Leuven" },
      { id: 12, name: "Hasselt" },
      { id: 14, name: "Mechelen" },
    ],
  },
  {
    when: ({ endpoint }) => endpoint === "POST /api/stations",
    then: () => ({
      id: 16,
      name: "Tournai",
    }),
  },
  {
    when: ({ endpoint }) => /PUT \/api\/stations\/\d+/.test(endpoint),
    then: () => ({
      id: 3,
      name: "Bruxelles-Midi",
    }),
  },
]
