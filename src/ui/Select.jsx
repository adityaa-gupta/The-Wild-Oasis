import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  @media only screen and (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem .6rem ;
  }
`;

export default function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options?.map((Option) => (
        <option key={Option.value} value={Option.value}>
          {Option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
