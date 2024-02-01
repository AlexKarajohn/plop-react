export const prompts = (config) => {
  return [
    {
      when: (data) => data.category === "Component",
      type: "input",
      name: "name",
      message: "Component Name",
    },
    {
      when: (data) =>
        data.category === "Component" && !config.component.defaultType,
      type: "list",
      name: "component.type",
      message: "Select what type of component you want to create:",
      choices: [
        { name: "Functional", value: "fc" },
        { name: "Class", value: "class" },
      ],
    },
    {
      when: (data) => data.category === "Component",
      type: "checkbox",
      name: "component.config",
      message: "Select what you want your component to have:",
      loop: true,
      choices: (data) => [
        { name: "Props", value: "props" },
        { name: "CSS", value: "css" },
        { name: "Folders", value: "folders" },
      ],
    },
    {
      when: (data) =>
        data.category === "Component" &&
        data.component.config.includes("folders"),
      type: "checkbox",
      name: "component.config.folders",
      message: "Select what folders you want your component to have:",
      loop: true,
      choices: () => [
        { name: "Utilities", value: "utils" },
        { name: "Components", value: "components" },
        { name: "Hooks", value: "hooks" },
        { name: "Context", value: "context" },
      ],
    },
  ];
};
