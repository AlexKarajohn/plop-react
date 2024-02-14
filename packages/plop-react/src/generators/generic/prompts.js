export const prompts = (config) => {
  return [
    {
      when: () => !config.language,
      type: "list",
      name: "language",
      message: "Select what language you are using:",
      choices: [
        { name: "Javascript", value: "js" },
        { name: "Typescript", value: "ts" },
      ],
    },
    {
      type: "list",
      name: "category",
      message: "Select what you want to create:",
      choices: ["Component",
        // "Function", "Hook", "Context"
      ],
    },
    {
      type: "input",
      name: "path",
      message: "Relative path to insert new files:"
    },
  ];
};
