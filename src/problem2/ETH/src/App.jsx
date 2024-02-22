// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [nftAmount, setNftAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [otherTokenAmount, setOtherTokenAmount] = useState('');

  const handleNftChange = (e) => {
    setNftAmount(e.target.value);
  };

  const handleEthChange = (e) => {
    setEthAmount(e.target.value);
  };

  const handleOtherTokenChange = (e) => {
    setOtherTokenAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform currency swap logic here
    console.log('Performing currency swap...');
  };

  return (
    <div className='app'>
      <h1>Currency Swap</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nftAmount'>NFT Amount:</label>
          <input
            type='number'
            id='nftAmount'
            value={nftAmount}
            onChange={handleNftChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ethAmount'>ETH Amount:</label>
          <input
            type='number'
            id='ethAmount'
            value={ethAmount}
            onChange={handleEthChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='otherTokenAmount'>Other Token Amount:</label>
          <input
            type='number'
            id='otherTokenAmount'
            value={otherTokenAmount}
            onChange={handleOtherTokenChange}
          />
        </div>
        <button type='submit'>Swap</button>
      </form>
    </div>
  );
}

export default App;
