export const prompts = (config) => {
  return [
    {
      when: (data) => data.category === "Hook",
      type: "checkbox",
      name: "hook.config",
      message: "Select what you want your hook to have:",
      loop: true,
      choices: ["Params"],
    },
  ];
};
