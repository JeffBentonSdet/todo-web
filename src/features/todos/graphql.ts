// Todo GraphQL operations. Typed GraphQL documents for todo queries and mutations.

export const GET_TODOS = `
  query GetTodos {
    todos {
      id
      title
      completed
      created_at
      updated_at
    }
  }
`;

export const GET_TODO = `
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      completed
      created_at
      updated_at
    }
  }
`;

export const CREATE_TODO = `
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      id
      title
      completed
      created_at
      updated_at
    }
  }
`;

export const TOGGLE_TODO = `
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      title
      completed
      created_at
      updated_at
    }
  }
`;

export const DELETE_TODO = `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
