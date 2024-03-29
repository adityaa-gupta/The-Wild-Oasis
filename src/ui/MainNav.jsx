import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
  HiOutlineUsers,
} from "react-icons/hi2";
import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  @media only screen and (max-width: 480px) {
    flex-direction: row;
    gap: 1rem;
    padding: 0 2rem;
    margin: 0 auto;
    justify-content: space-evenly;
    &:nth-last-child() {
      padding-right: 0;
      margin-right: 0;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    @media only screen and (max-width: 480px) {
      gap: 0.7rem;
      font-size: 1rem;
      padding: 0.8rem 1.5rem;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
  @media only screen and (max-width: 480px) {
    & svg {
      width: 2rem;
      height: 2rem;
      color: var(--color-grey-400);
      transition: all 0.3s;
    }
    &:link,
    &:visited {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      color: var(--color-grey-600);
      font-size: 0.8rem;
      font-weight: 500;
      /* padding: 1.2rem 2.4rem; */
      transition: all 0.3s;
    }
  }
`;
const StyledNave = styled.div`
  /* padding: 1.2rem 2.4rem */
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

function MainNav() {
  const { user } = useUser();
  return (
    <StyledNave>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        {user?.user_metadata.role === "guest" || (
          <li>
            <StyledNavLink to="/guests">
              <HiOutlineUser />
              <span>Guests</span>
            </StyledNavLink>
          </li>
        )}
        {user.user_metadata.role === "guest" || (
          <li>
            <StyledNavLink to="/settings">
              <HiOutlineCog6Tooth />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        )}
        {user?.user_metadata.role === "guest" && (
          <li>
            <StyledNavLink to="/about">
              <HiOutlineUser />
              <span>About</span>
            </StyledNavLink>
          </li>
        )}
      </NavList>
    </StyledNave>
  );
}

export default MainNav;
