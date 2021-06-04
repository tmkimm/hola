import React from "react";
import Select from "react-select";
import languageList from "../../languageList";

const customStyles = {
  control: (css) => ({
    ...css,
    width: "500px",
    height: "3rem",
  }),
};

const LikeLanguages = ({ likeLanguages, setLikeLanguages }) => {
  return (
    <Select
      isMulti
      styles={customStyles}
      name="likeLanguages"
      options={languageList}
      classNamePrefix="select"
      value={likeLanguages}
      onChange={(value) => {
        setLikeLanguages(value);
      }}
    />
  );
};

export default LikeLanguages;
