import React, { Component } from "react";
import { CREATE_ACCOUNT_PAGE } from "../../constants/navigation";
import "./styles.css";
import HeaderBack from "../../components/header-back";
import { getChainLogo } from "../../utils/chain";
import ChainCard from "../../components/chain-card";
import AddAccountIcon from "../../images/add_account_icon.svg";
import { changeAccount } from "../manage-account/actions";

export default class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      chain: props.network.unit,
      networks: props.networks,
    };
  }

  componentDidMount() {
    this.setState({
      chain: "ALL",
    });
  }

  handleSubheaderBackBtn = () => {
    this.props.changePage(this.props.backupPage);
  };

  handleAddAccount = async () => {
    await this.props.addAccount();
    this.props.changePage(CREATE_ACCOUNT_PAGE);
  };

  chainClicked = (name) => {
    this.setState({
      chain: name,
      networks:
        name === "ALL"
          ? this.props.networks
          : this.props.networks.filter((n) => n.unit === name),
    });
  };
  accountClicked = async (account, network) => {
    this.handleClose();
    try {
      await this.props.switchNetwork(network);
      this.props.changeAccount(account);
    } catch (e) {
      this.props.updateAppLoading(false);
      this.props.createToast({
        message: `Failed to connect ${network.unit} chain...`,
        type: "error",
      });
    }
  };
  handleClose = () => {
    this.props.changePage(this.props.backupPage);
  };
  render() {
    const { fullChainAccounts } = this.props;
    const { chain, networks } = this.state;
    return (
      <div className="container">
        <HeaderBack
          handleBack={this.handleSubheaderBackBtn}
          title="SETTING"
          style={{ textAlign: "left", marginLeft: "25px" }}
        />
        <div className="panel-container manage-account-list">
          <div className="left-panel" style={{ height: "415px" }}>
            <img
              src={getChainLogo("ALL", chain === "ALL")}
              alt="logo"
              width="35"
              onClick={() => this.chainClicked("ALL")}
              aria-hidden="true"
              className="can-click"
            />
            <span
              className={chain === "ALL" ? "split split-select" : "split"}
            />
            {this.props.networks.map((nt, index) => (
              <React.Fragment key={`chain_logo_${index.toString()}`}>
                <img
                  src={getChainLogo(nt.unit, chain === nt.unit)}
                  alt="logo"
                  width="35"
                  onClick={() => this.chainClicked(nt.unit)}
                  aria-hidden="true"
                  className="can-click"
                />
                <span
                  className={chain === nt.unit ? "split split-select" : "split"}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="right-panel" style={{ height: "415px" }}>
            {fullChainAccounts.map((fullChainAccount, netIdx) =>
              fullChainAccount.accounts.map((acc, accIdx) => (
                <ChainCard
                  account={acc}
                  network={networks.find(
                    (net) => net.unit === fullChainAccount.symbol
                  )}
                  key={`card_logo_${netIdx.toString()}_${accIdx.toString()}`}
                  accountClicked={this.accountClicked}
                />
              ))
            )}
          </div>
        </div>
        <div className="footer" onClick={this.handleAddAccount}>
          <img src={AddAccountIcon} alt="close" aria-hidden="true" width="14" />
          <span
            className="close"
            style={{ fontFamily: "Inter-Bold", fontSize: "15px" }}
          >
            ADD ACCOUNT
          </span>
        </div>
      </div>
    );
  }
}
