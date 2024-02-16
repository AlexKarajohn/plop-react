import merge from "lodash.merge";
import { defaultConfig } from "./generators/config/default.js";

import { prompts as componentPrompts } from "./generators/component/prompts.js";
import { prompts as genericPrompts } from "./generators/generic/prompts.js";
import { prompts as contextPrompts } from "./generators/context/prompts.js";
import { prompts as functionPrompts } from "./generators/function/prompts.js";
import { prompts as hookPrompts } from "./generators/hook/prompts.js";

import { actions as componentActions } from "./generators/component/actions.js";
import { actions as functionActions } from "./generators/function/actions.js";

import { validateConfig } from "./generators/config/validator.js";
import { helpers } from "./helpers/helpers.js";
import { getConfig } from "./utils/getConfig.js";

export default async function (plop) {
  console.log("-------------React Code Generation-------------");
  let externalConfig;

  try {
    externalConfig = await getConfig();
    const { isValid, validationErrors } = validateConfig(externalConfig);

    if (!isValid) {
      throw new Error(validationErrors);
    }
  } catch (err) {
    console.log(err);
  }

  const combinedConfig = merge(defaultConfig, externalConfig);
  const combinedPrompts = [
    ...genericPrompts(combinedConfig),
    ...componentPrompts(combinedConfig),
    ...contextPrompts(combinedConfig),
    ...functionPrompts(combinedConfig),
    ...hookPrompts(combinedConfig),
  ];
  helpers(plop);
  plop.setGenerator("react", {
    description: "Complete React Creation",
    prompts: combinedPrompts,
    actions: (data) => {
      if (data.category === "Component") {
        return componentActions(data, combinedConfig);
      } else if (data.category === 'Function')
        return functionActions(data, combinedConfig);
      return [];
    },
  });
}
