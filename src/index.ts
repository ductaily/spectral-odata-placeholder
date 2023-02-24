import { Document, Ruleset, Spectral } from "@stoplight/spectral-core";

import { DiagnosticSeverity } from "@stoplight/types";
import { FormatterOptions } from "@stoplight/spectral-cli/dist/formatters/types";
import { Json } from "@stoplight/spectral-parsers";
import { join } from "path";
import { oas } from "@stoplight/spectral-rulesets";
import { readFileSync } from "fs";
import { stylish } from "@stoplight/spectral-cli/dist/formatters";
import { truthy } from "@stoplight/spectral-functions";

const source = join(__dirname, "odata_example_oas_3.json")
const document = new Document(readFileSync(source, {encoding: "utf-8"}), Json, source)

const ruleset = {
  extends: [oas],
  rules: {
    "odata-place-holder": {
      message: "Field `x-custom-extension` missing.",
      severity: DiagnosticSeverity.Error,
      given: '$.paths.*.*.responses[?(@property.match(/^[12]/))].content.application/json[?(@.type == "object")]',
      then: {
        field: "x-custom-extension",
          function: truthy
      }
    }
  }
}

const spectral = new Spectral()
spectral.setRuleset(ruleset)

spectral.run(document).then((results) => {
  const output = stylish(results, {} as FormatterOptions);
  console.log(output);
});