export default dummyData = {
    origins: [
      { label: "Douala", value: "Douala" },
      { label: "Yaounde", value: "Yaounde" },
      { label: "Limbe", value: "Limbe" },
      { label: "Mutengene", value: "Mutengene" },
      { label: "Kumba", value: "Kumba" },
      { label: "Tiko", value: "Tiko" },
      { label: "Mundemba", value: "Mundemba" },
    ],
    destinations: {
      Douala: [
        { label: "Bamenda", value: "Bamenda" },
        { label: "Buea", value: "Buea" },
        // Add more destinations
      ],
      Yaounde: [
        { label: "Bafoussam", value: "Bafoussam" },
        { label: "Garoua", value: "Garoua" },
        // Add more destinations
      ],
    },
    schedules: {
      Bamenda: [
        { label: "Morning", value: "Morning" },
        { label: "Evening", value: "Evening" },
        // Add more schedules
      ],
      Buea: [
        { label: "Afternoon", value: "Afternoon" },
        { label: "Night", value: "Night" },
        // Add more schedules
      ],
      // Add more schedules for other destinations
    },
    dates: {
      Morning: [new Date("2024-07-21"), new Date("2024-07-22")],
      Evening: [new Date("2024-07-23"), new Date("2024-07-24")],
      // Add more dates for other schedules
    },
  };