const isFunction = (data) => data.category === "Function";

export const prompts = () => {
  return [
    {
      when: (data) => isFunction(data),
      type: "checkbox",
      name: "function.config",
      message: "Select what you want your function to have:",
      loop: true,
      choices: () => [{ name: "Params", value: "params" }],
    },
  ];
};
