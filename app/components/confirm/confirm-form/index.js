import React, { Component } from 'react';
import FooterButton from '../../common/footer-button';
import ConfirmParticular from '../confirm-particular';
import ConfirmFromTo from '../confirm-from-to';
import './styles.css';

export default class ConfirmForm extends Component {
  render() {
    const {
      confirmDetails: {
        metadata: {
          to,
          account: { address, alias },
          transferAmount,
          transferFee,
          totalTransferAmount,
        },
      },
      handleSend,
      buttonText,
      theme,
    } = this.props;
    return (
      <div className="confirm-form-container">
        <ConfirmFromTo to={to} theme={theme} from={address} alias={alias} />
        <div className="confirm-form-amount-border" />
        <ConfirmParticular
          className="confirm-form-amount-container"
          description="Amount"
          price={`${transferAmount}`}
        />
        <ConfirmParticular
          className="confirm-form-fee-container"
          description="Fee"
          price={`${transferFee}`}
        />
        <ConfirmParticular
          className="confirm-form-total-container"
          description="Total"
          price={`${totalTransferAmount}`}
        />
        <FooterButton onClick={handleSend} name={buttonText} />
      </div>
    );
  }
}
