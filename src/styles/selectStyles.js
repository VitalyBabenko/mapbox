export const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    border: isFocused ? "1px solid #006cd5" : "1px solid #d8d6de",
  }),

  option: (styles) => ({
    ...styles,
    cursor: "pointer",
  }),

  valueContainer: (styles) => ({
    ...styles,
    padding: "4px",
    fontSize: "14px",
    fontWeight: "500",
  }),

  multiValueLabel: (styles) => ({
    ...styles,
    fontSize: "13px",
    fontWeight: "500",
    paddingRight: "5px",
  }),

  multiValueRemove: (styles) => ({
    ...styles,

    ":hover": {
      ...styles[":hover"],
      cursor: "pointer",
    },
  }),

  indicatorsContainer: (styles) => ({
    ...styles,
    cursor: "pointer",
  }),
};
