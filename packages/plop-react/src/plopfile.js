import merge from "lodash.merge";
import { defaultConfig } from './generators/config/default.js'
import { prompts as componentPrompts } from "./generators/component/prompts.js";
import { actions as componentActions } from "./generators/component/actions.js";
import { prompts as genericPrompts } from "./generators/generic/prompts.js";
import { prompts as contextPrompts } from "./generators/context/prompts.js";
import { prompts as functionPrompts } from "./generators/function/prompts.js";
import { prompts as hookPrompts } from "./generators/hook/prompts.js";
import { validateConfig } from "./generators/config/validator.js";
import { helpers } from "./helpers/helpers.js";
import { getConfig } from "./utils/getConfig.js";

export default async function (plop) {
  console.log('-------------React Code Generation-------------')
  let externalConfig;

  try {
    externalConfig = getConfig()
    const { isValid, validationErrors } = validateConfig(externalConfig);
    
    if (!isValid) {
      throw new Error(validationErrors);
    }
  } catch (err) {
    console.log(err)
  }
    const combinedConfig = merge(defaultConfig,externalConfig)
    const genPrompts = genericPrompts(combinedConfig);
    const compPrompts = componentPrompts(combinedConfig);
    const cntxPrompts = contextPrompts(combinedConfig);
    const fnPrompts = functionPrompts(combinedConfig);
    const hkPrompts = hookPrompts(combinedConfig);
    const combinedPrompts = [
      ...genPrompts,
      ...compPrompts,
      ...cntxPrompts,
      ...fnPrompts,
      ...hkPrompts,
    ];
    helpers(plop);
    plop.setGenerator("react", {
      description: "Complete React Creation",
      prompts: combinedPrompts,
      actions: (data) => {
        if (data.category === "Component") {
          return componentActions(data, combinedConfig);
        }
        return [];
      },
    });

}
