import { toChecksumAddress } from "web3-utils";
import { checkAddressCheckSum, isAddress } from "web3-validator";

enum EChainEcosystem {
  EVM = "evm",
}

export const validateEVMAddress = async (value: string) => {
  if (!value) return false;
  let _addressIsValid = false;
  _addressIsValid = isAddress(value, false);
  return _addressIsValid;
};

export const validateEVMChecksum = async (value: string) => {
  if (!value) return false;
  const addressOK = isAddress(value);
  if (addressOK) {
    const checksumOK = checkAddressCheckSum(value);
    return addressOK && checksumOK;
  }
  return false;
};

export const toValidAddressChecksum = (address: string): string | undefined => {
  const checksumOK = checkAddressCheckSum(address);
  if (!checksumOK) {
    const checksum = toChecksumAddress(address);
    return checksum;
  }
  return undefined;
};
