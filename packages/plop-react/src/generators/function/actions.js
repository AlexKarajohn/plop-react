export const actions = (data, config) => {
  const pathToFunction = `${data.path}/${
    data.name[0].toLowerCase() + data.name.slice(1)
  }`;
  /**
   * Create Data Configuration for Actions
   */
  const customdata = {
    ...config,
    params: data.function.config.includes("params"),
    js: config.language === "js",
    ts: config.language === "ts",
    namedExport: config.function.namedExport,
    class: data.function.type === "class",
    separateFolder: config.function.testFile.separateFolder,
    separateTypes: config.function.separateTypes,
  };

  const actions = [];
  /*
   * Add A functional component
   */

  actions.push({
    type: "add",
    path: `${pathToFunction}/${
      data.name[0].toLowerCase() + data.name.slice(1)
    }.${config.language}`,
    templateFile: "./generators/function/function.hbs",
    data: {
      data: customdata,
    },
  });
  /**
   * Add Test File
   */
  if (config.component.testFile.enabled) {
    const path = `${pathToFunction}/${
      config.component.testFile.separateFolder ? "__TEST__/" : ""
    }${data.name[0].toLowerCase() + data.name.slice(1)}.test.${
      config.language
    }`;
    actions.push({
      type: "add",
      path,
      templateFile: "./generators/function/function.test.hbs",
      data: {
        data: customdata,
      },
    });
  }

  return actions;
};
