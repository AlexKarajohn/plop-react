export const defaultConfig = {
  language: "ts",
  component: {
    testFile: {
      enabled: true,
      separateFolder: false,
      testingLibary: "@testing-library/react",
    },
    separateTypes: true,
    namedExport: true,
  },
  function: {
    testFile: {
      enabled: true,
      separateFolder: false,
    },
    namedExport: true
  }
};
