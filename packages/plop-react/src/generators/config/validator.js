import { Validator } from "jsonschema";

const validator = new Validator();

const testFile = {
  type: "object",
  properties: {
    enabled: { type: "boolean" },
    separateFolder: { type: "boolean" },
  },
};

const schema = {
  type: "object",
  properties: {
    language: {
      enum: ["js", "ts"],
    },
    function: {
      type: "object",
      properties: {
        testFile: {
          ...testFile,
        },
        namedExport: {
          type: "boolean",
        },
      },
    },
    component: {
      type: "object",
      properties: {
        testFile: {
          ...testFile,
          testingLibary: {
            enum: ["@testing-library/react"],
          },
        },
        namedExport: {
          type: "boolean",
        },
        separateTypes: {
          type: "boolean",
        },
      },
    },
  },
};

export const validateConfig = (config) => {
  const validation = validator.validate(config, schema, { nestedErrors: true });
  const isValid = validation.valid;
  const validationErrors = validation.errors;
  return { isValid, validationErrors };
};
