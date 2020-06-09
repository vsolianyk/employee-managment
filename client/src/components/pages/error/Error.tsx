import React from 'react';
import { match } from 'react-router-dom';

interface Props {
  match: match<{type: 'forbidden' | 'server'}>;
}

const errors = {
  forbidden: 'Access denide',
  server: 'Server error',
};

const ErrorPage: React.FunctionComponent<Props> = ({ match }: Props) => {
  const title = errors[match.params.type] || 'Somthing went wrong';
  return (
    <div >
        <h1>{title}</h1>
    </div>
  );
};

export default ErrorPage;
