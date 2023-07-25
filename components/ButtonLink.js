import Link from "next/link";
import styled from "styled-components";
import {ButtonStyle} from "@/components/Button";
import {darken} from "polished";
import {white} from "@/lib/colors";

const StyledLink = styled(Link)`
  ${ButtonStyle}
  &:hover {
    color: ${darken(0.1, white)};
    border-color: ${darken(0.1, white)};
  }
`;

export default function ButtonLink(props) {
    return (
        <StyledLink {...props} />
    );
}