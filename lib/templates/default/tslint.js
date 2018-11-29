const UNIVERSAL_RULES = {
  "arrow-parens": [true, "ban-single-arg-parens"],
  "no-implicit-dependencies": false, // disabled to allow @store, @components, etc paths. The tsconfig.json will catch missing modules.
  "no-submodule-imports": [true, "firestudio", "next-spa", "next", "@components", "@config", "@containers", "@helpers", "@layouts", "@store"],
  "no-unused-expression": [true, "allow-tagged-template"],
  "ordered-imports": false,
  "quotemark": [true, "single", "jsx-double"],
  "semicolon": [true, "never"],
  "sort-imports": false
}

const TS_RULES = {
  "member-access": [true, "no-public"]
}

const REACT_RULES = {
  "jsx-no-multiline-js": false
}

module.exports = {
  extends: ["tslint:latest", "tslint-react"],
  jsRules: UNIVERSAL_RULES,
  rules: {
    ...UNIVERSAL_RULES,
    ...TS_RULES,
    ...REACT_RULES
  },
  defaultSeverity: "error"
}
