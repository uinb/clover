import { connect } from 'react-redux';
import QRCode from './qr-code.component';
import { changePage } from '../../containers/actions';
import { createToast } from '../../constants/toast';

const mapStateToProps = state => ({
  account: state.accountReducer.account,
  network: state.networkReducer.network,
  selectedToken: state.accountReducer.selectedToken,
});

const mapDispatchToProps = {
  changePage,
  createToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(QRCode);
