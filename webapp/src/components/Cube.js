import React from 'react';
import { createBlockbinContract } from '../util/ethereum';

/**
 * hash is in the form '0x....'
 * This returns a promise
 */
const getCubeContent = function(hash) {
  var getCubePromise = new Promise((resolve, reject) => {
    if (typeof window.web3 !== 'undefined') {
      var web3 = new window.Web3(window.web3.currentProvider);
      var contractInstance = createBlockbinContract(web3);
    } else {
      alert('cannot access web3. Did you install/enable Metamask?')
      return;
    }
    contractInstance.readCube.call(
      hash,
      function(error, result) {
        console.log(error, result);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
  return getCubePromise;
};

const Cube = function(match) {
  getCubeContent(match.match.params.cubeId)
    .then(function(result) {alert(result); })
    .catch(function(error) { console.error(error); });
  return (
    <div>
      <h3>Cube: {match.match.params.cubeId}</h3>
    </div>
  );
}

export default Cube;
