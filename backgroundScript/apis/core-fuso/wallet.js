// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Keyring, setSS58Format, encodeAddress, decodeAddress
} from '@polkadot/keyring';
import {
  formatBalance, isHex, hexToU8a, u8aToHex, u8aToString
} from '@polkadot/util';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { getApi } from '../api';
import { SUCCESS, FAILURE } from '../../../lib/constants/api';
import * as ChainApi from '../chain';

export const getAddress = (seedWords, keypairType) => {
  try {
    setSS58Format(42);
    const keyring = new Keyring({ type: keypairType });
    const pairAlice = keyring.addFromUri(seedWords);
    const { address } = pairAlice;
    return address;
  } catch (err) {
    throw new Error('Error in fuso getAddress');
  }
};

export const createSeedWords = () => mnemonicGenerate();

export const valueFormatter = (value, token = 'TAO') => {
  try {
    formatBalance.setDefaults({ unit: token });
    const fBalance = formatBalance(value, true, 18);
    return fBalance;
  } catch (err) {
    throw new Error('Error in fuso valueFormatter');
  }
};

export const isValidAddress = value => {
  try {
    encodeAddress(isHex(value) ? hexToU8a(value) : decodeAddress(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const getBalance = async address => {
  try {
    const api = getApi();
    const { data } = await api.query.system.account(address);
    const balance = data.free.toString();
    const decimals = ChainApi.getTokenDecimals();
    const token = ChainApi.getTokenSymbol();
    formatBalance.setDefaults({ unit: token });
    const balanceFormatted = formatBalance(balance, true, decimals);
    const taoBalance = formatBalance(balance, { forceUnit: token, withSi: true }, decimals);
    const balanceObj = {
      address,
      tokens: [
        {
          token,
          balance: balance.toString(),
          amount: taoBalance.replace(` ${token}`, ''),
          marketData: '0',
          balanceFormatted,
        },
      ],
      status: SUCCESS,
    };
    return balanceObj;
  } catch (err) {
    const balanceObj = {
      address,
      tokens: [
        {
          token: 'TAO',
          balance: '0',
          amount: '0',
          marketData: '0',
          balanceFormatted: formatBalance('0', true, 18),
        },
      ],
      status: FAILURE,
    };
    return balanceObj;
  }
};

export const getAccountPair = async (keypairType, seedWords) => {
  const keyring = new Keyring({ type: keypairType });
  const accountPair = keyring.addFromUri(seedWords);
  return accountPair;
};

export const getAccountForUI = account => ({
  address: account.address,
  alias: account.alias,
  keypairType: account.keypairType,
});

export const getSignMessage = async (account, message) => {
  const { seedWords, keypairType } = account;
  const accountPair = await getAccountPair(keypairType, seedWords);
  const signedMessage = u8aToHex(accountPair.sign(message.message));
  const result = {
    account: getAccountForUI(account),
    message: {
      ...message,
      signedMessage,
    },
  };
  return result;
};

export const getStringMessageFromHex = message => u8aToString(hexToU8a(message));
