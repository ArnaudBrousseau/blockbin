import React from 'react';

const Cube = ({ match }) => (
  <div>
    <h3>Cube ID: {match.params.cubeId}</h3>
  </div>
);

export default Cube;
