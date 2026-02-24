// Todo GraphQL operations. Typed GraphQL documents for todo queries and mutations.

export const GET_TODOS = `
  query GetTodos($status: String, $search: String) {
    todos(status: $status, search: $search) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const GET_TODO = `
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_TODO = `
  mutation CreateTodo($title: String!, $description: String) {
    createTodo(title: $title, description: $description) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TODO = `
  mutation UpdateTodo($id: ID!, $title: String, $description: String, $status: String) {
    updateTodo(id: $id, title: $title, description: $description, status: $status) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TODO = `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
