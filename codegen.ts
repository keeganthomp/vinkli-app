import dotenv from 'dotenv';
dotenv.config();

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:4000/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.INTROSPECTION_SECRET}`,
        },
      },
    },
  ],
  documents: ['graphql/**/*.ts'],
  generates: {
    './graphql/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: { withHooks: true },
    },
  },
  ignoreNoDocuments: true,
};
export default config;
