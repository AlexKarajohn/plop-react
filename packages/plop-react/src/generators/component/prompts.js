const isComponent = (data) => data.category === "Component";

export const prompts = () => {
  return [
    {
      when: (data) => isComponent(data),
      type: "list",
      name: "component.type",
      message: "Select what type of component you want to create:",
      choices: [
        { name: "Functional", value: "fc", checked: true },
        { name: "Class", value: "class" },
      ],
    },
    {
      when: (data) => isComponent(data),
      type: "checkbox",
      name: "component.config",
      message: "Select what you want your component to have:",
      loop: true,
      choices: () => [
        { name: "Props", value: "props" },
        { name: "CSS", value: "css" },
        { name: "Folders", value: "folders" },
      ],
    },
    {
      when: (data) =>
        isComponent(data) && data.component.config.includes("folders"),
      type: "checkbox",
      name: "component.config.folders",
      message: "Select what folders you want your component to have:",
      loop: true,
      choices: (data) => {
        const options = [
          { name: "Utilities", value: "utils" },
          { name: "Components", value: "components" },
          { name: "Context", value: "context" },
          { name: "Assets", value: "assets" },
        ];
        if (data.component.type === "fc")
          options.push({ name: "Hooks", value: "hooks" });
        return options;
      },
    },
  ];
};
