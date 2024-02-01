export const prompts = (_) => {
  return [
    {
      when: (data) => data.category === "Context",
      type: "checkbox",
      name: "context.config",
      message: "Select what you want your context to have:",
      loop: true,
      choices: [
        { name: "Props", value: "props" },
        { name: "Folders", value: "folders" },
      ],
    },
    {
      when: (data) =>
        data.category === "Context" && data.context.config.includes("folders"),
      type: "checkbox",
      name: "context.config.folders",
      message: "Select what folders you want your component to have:",
      loop: true,
      choices: () => [
        { name: "Utilitys", value: "utils" },
        { name: "Hooks", value: "hooks" },
      ],
    },
  ];
};
