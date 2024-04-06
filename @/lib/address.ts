import * as AddressValidator from "multicoin-address-validator";
import { sha3, toChecksumAddress } from "web3-utils";
import { checkAddressCheckSum, isAddress } from "web3-validator";

enum EChainEcosystem {
  EVM = "evm",
}

export const validateEVMAddress = async (value: string) => {
  console.debug("validateEVMAddress", { value });
  if (!value) return false;

  let _addressIsValid = false;
  _addressIsValid = isValidAddress(value);
  console.debug("validateEVMAddress", _addressIsValid);

  return _addressIsValid;
};

export const validateEVMChecksum = async (value: string) => {
  console.debug("validateEVMChecksum", { value });
  if (!value) return false;

  let _checksumIsValid = false;
  _checksumIsValid = isValidAddressChecksum(value);

  return _checksumIsValid;
};

/**
 * * Validate address if possible, otherwise return true.
 */
export const isValidAddress = (address: string): boolean => {
  return AddressValidator.validate(address, "Ethereum");
};

export const isValidAddressChecksum = (address: string): boolean => {
  const addressOK = isAddress(address);
  if (addressOK) {
    const checksumOK = checkAddressCheckSum(address);
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

export const validateAddressChecksum = (_address: string): boolean => {
  // Check each case
  let address = _address;
  try {
    address = address.replace(/^0x/i, "");
    if (!address || address === "") {
      return false;
    }
    const addressHash = sha3(address?.toLowerCase())?.replace(/^0x/i, "");

    for (let i = 0; i < 40; i += 1) {
      // the nth letter should be uppercase if the nth digit of casemap is 1
      const hashItem = addressHash?.[i];
      const addressItem = address?.[i];
      if (!hashItem || !addressItem) {
        return false;
      }
      if (
        (parseInt(hashItem, 16) > 7 &&
          addressItem.toUpperCase() !== addressItem) ||
        (parseInt(hashItem, 16) <= 7 &&
          addressItem.toLowerCase() !== addressItem)
      ) {
        return false;
      }
    }
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error({ e, where: "validateAddressChecksum" });
  }
  return false;
};
