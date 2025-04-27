import { gql } from "@apollo/client";

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(loginInput: $input) {
      id
      name
      token
    }
  }
`;
