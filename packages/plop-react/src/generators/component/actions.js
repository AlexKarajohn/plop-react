export const actions = (data, config) => {
  const pathToComponent = `${data.path}/${data.name[0].toUpperCase() + data.name.slice(1)}`

  const actions = [];
  actions.push({
    type: "add",
    path: `${pathToComponent}/${data.name[0].toUpperCase() + data.name.slice(1)}.${
      config.language
    }x`,
    templateFile: "./generators/component/component.hbs",
    data: {
      data: {
        ...config,
        props: data.component.config.includes("props"),
        js: config.language === "js",
        ts: config.language === "ts",
        namedExport: config.component.namedExport,
      },
    },
  });
  if (config.language === "ts" && data.component.config.includes("props"))
  actions.push({
    type: "add",
    path: `${pathToComponent}/types/types.ts`,
    templateFile: "./generators/component/component.types.hbs",
    data: {
      data: {
        ...config,
      },
    },
  });
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
        data: {
          ...config,
          props: data.component.config.includes("props"),
          js: config.language === "js",
          ts: config.language === "ts",
          separateFolder: config.component.testFile.separateFolder,
          namedExport: config.component.namedExport,
          testingLibary: {'testing-library-react': config.component.testFile.testingLibary === '@testing-library/react'}
        },
      },
    });
    if (data.component.config.folders && data.component.config.folders.length > 0) {
      data.component.config.folders.forEach((folder) => {
        actions.push({
          type: "add",
          path:`${pathToComponent}/${folder}/git.keep`
        });
      });
    }
  }
  return actions;
};
