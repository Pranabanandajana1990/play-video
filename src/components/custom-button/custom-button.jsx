import React from "react";
// import "./custom-button.scss";
import { CustomButtonContainer } from "./custom-button.style";
export const CustomButton = ({ children, ...otherProps }) => (
  <CustomButtonContainer {...otherProps}>{children}</CustomButtonContainer>
);

export default CustomButton;
