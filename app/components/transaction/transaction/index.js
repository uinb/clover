import React, { Component } from 'react';
import FontMedium from '../../common/fonts/font-medium';
import TransactionItems from '../transaction-items';
import TransactionMessage from '../transaction-message';
import './styles.css';

export default class Transaction extends Component {
  render() {
    const {
      transactions,
      checkTransactionDetail,
      isLinkToFaucet,
      network,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <FontMedium className="transactions-header" text="Record" />
        {transactions.length > 0 ? (
          <TransactionItems
            className="transaction-list-container"
            checkTransactionDetail={checkTransactionDetail}
            transactions={transactions}
          />
        ) : (
          <TransactionMessage
            className="transaction-message"
            isLinkToFaucet={isLinkToFaucet}
            network={network}
          />
        )}
      </div>
    );
  }
}
