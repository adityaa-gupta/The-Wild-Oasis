import React from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  @media only screen and (max-width: 480px){
    padding: .1rem;
    gap: .2rem;
  } 
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
  @media only screen and (max-width: 480px) {
    font-size: .7rem;
    font-weight: 400;
    
    padding: 0.34rem 0.5rem;
  }
`;

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(val) {
    searchParams.set(filterField, val);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  console.log(options[0].value);
  const currentFilter = searchParams.get(filterField) || options[0].value;

  return (
    <StyledFilter>
      {options.map((Option) => (
        <>
          <FilterButton
            key={Option.value}
            onClick={() => handleClick(Option.value)}
            active={Option.value === currentFilter}
          >
            {Option.label}
          </FilterButton>
        </>
      ))}
    </StyledFilter>
  );
}
