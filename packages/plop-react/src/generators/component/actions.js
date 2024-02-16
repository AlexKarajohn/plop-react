export const actions = (data, config) => {
  const pathToComponent = `${data.path}/${
    data.name[0].toUpperCase() + data.name.slice(1)
  }`;

  /**
   * Create Data Configuration for Actions
   */

  const customdata = {
    ...config,
    props: data.component.config.includes("props"),
    js: config.language === "js",
    ts: config.language === "ts",
    namedExport: config.component.namedExport,
    class: data.component.type === "class",
    separateFolder: config.component.testFile.separateFolder,
    separateTypes: config.component.separateTypes,
    testingLibary: {
      "testing-library-react":
        config.component.testFile.testingLibary === "@testing-library/react",
    },
  };

  const actions = [];
  /*
   * Add A functional component
   */
  if (data.component.type === "fc")
    actions.push({
      type: "add",
      path: `${pathToComponent}/${
        data.name[0].toUpperCase() + data.name.slice(1)
      }.${config.language}x`,
      templateFile: "./generators/component/component.fc.hbs",
      data: {
        data: customdata,
      },
    });
  /**
   * Add a Class component
   */ else
    actions.push({
      type: "add",
      path: `${pathToComponent}/${
        data.name[0].toUpperCase() + data.name.slice(1)
      }.${config.language}x`,
      templateFile: "./generators/component/component.class.hbs",
      data: {
        data: customdata,
      },
    });
  /**
   * Add Types
   */
  if (
    config.language === "ts" &&
    config.component.separateTypes &&
    (data.component.config.includes("props") || data.component.type === "class")
  )
    actions.push({
      type: "add",
      path: `${pathToComponent}/types/types.ts`,
      templateFile: "./generators/component/component.types.hbs",
      data: {
        data: customdata,
      },
    });
  /**
   * Add Test File
   */
  if (config.component.testFile.enabled) {
    const path = `${pathToComponent}/${
      config.component.testFile.separateFolder ? "__TEST__/" : ""
    }${data.name[0].toUpperCase() + data.name.slice(1)}.test.${
      config.language
    }x`;
    actions.push({
      type: "add",
      path,
      templateFile: "./generators/component/component.test.hbs",
      data: {
        data: customdata,
      },
    });
  }
  /**
   * Add Folders
   */
  if (
    data.component.config.folders &&
    data.component.config.folders.length > 0
  ) {
    data.component.config.folders.forEach((folder) => {
      actions.push({
        type: "add",
        path: `${pathToComponent}/${folder}/git.keep`,
      });
    });
  }
  return actions;
};
