import React from 'react';

import LoginStyles from './login.module.scss';

const page = () => {
  return (
    <div className={LoginStyles.container}>
      <h1 className={LoginStyles.title}>Connexion</h1>
    </div>
  );
};

export default page;