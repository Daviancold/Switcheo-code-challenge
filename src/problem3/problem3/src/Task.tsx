import { useEffect, useState, useMemo } from 'react'; // Added imports
import axios from 'axios';

/**
 * Added blockchain type for the WalletBalance interface
 */
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

/**
 * Added children prop and deleted BoxProps
 */
interface Props {
  children: String;
}

/** 
 * Implemented class with json get function
 * No error handling as it is catched in useEffect
*/

class Datasource {
  // TODO: Implement datasource class
  source: string;

  constructor(url) {
    this.source = url;
  }

  public getPrices = async () => {
    const response = await axios.get(this.source);
    const priceList = response.data;
    return priceList;
  };
}

const useWalletBalances = () => {
  // Implement unknown useWalletBallance logic
}

/**
 * Refactored code
 * 
 * sortedBalance was edited, with implicit function call for formattedBalance extracted
 * for better readability.
 * 
 * Filter and sort logic was shortened for better readability, original code was too
 * nested
 * 
 * Typo in line 56 for lhspriority, and missing import for the component WalletRow
 */

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource(
      'https://interview.switcheo.com/prices.json'
    );
    datasource
      .getPrices()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const formatBalance = (balance: WalletBalance): FormattedWalletBalance => ({
    ...balance,
    formatted: balance.amount.toFixed(),
  });

  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          balance.amount <= 0 && getPriority(balance.blockchain) > -99
      )
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(lhs.blockchain) - getPriority(rhs.blockchain)
      );
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map(formatBalance);

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
