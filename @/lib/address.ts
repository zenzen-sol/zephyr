import AwesomeDebouncePromise from "awesome-debounce-promise";
import * as AddressValidator from "multicoin-address-validator";
import { normalize } from "path";
import { sha3, toChecksumAddress } from "web3-utils";
import { checkAddressCheckSum, isAddress } from "web3-validator";
import { getMainnetClient, isPossiblyEns } from "./ens";

enum EChainEcosystem {
  EVM = "evm",
}

export const validateEVMAddress = () =>
  AwesomeDebouncePromise(async (value: string): Promise<boolean> => {
    console.debug("validateEVMAddress", { value });
    if (!value) return false;
    let addressToBeValidated = value;
    const isPossiblyEnsAddress = isPossiblyEns(value);
    if (!value) {
      return false;
    }

    let _ensAddress: string | undefined;
    if (isPossiblyEnsAddress) {
      _ensAddress = await getAddressFromEns(value);
      addressToBeValidated = _ensAddress || value;
    }

    let _addressIsValid = false;
    _addressIsValid = isValidAddress(addressToBeValidated);
    console.debug("validateEVMAddress", _addressIsValid);

    return _addressIsValid;
  }, 300);

export const validateEVMChecksum = () => {
  AwesomeDebouncePromise(async (value: string): Promise<boolean> => {
    if (!value) return false;
    let addressToBeValidated = value;
    const isPossiblyEnsAddress = isPossiblyEns(value);
    if (!value) {
      return false;
    }

    let _ensAddress: string | undefined;
    if (isPossiblyEnsAddress) {
      _ensAddress = await getAddressFromEns(value);
      addressToBeValidated = _ensAddress || value;
    }

    let _checksumIsValid = false;
    _checksumIsValid = isValidAddressChecksum(addressToBeValidated);

    return _checksumIsValid;
  }, 300);
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

export const isEvmAddress = (_address: string): boolean => {
  return isAddress(_address);
};

export const getAddressFromEns = async (
  _possibleName: string,
): Promise<string | undefined> => {
  try {
    const viemClient = getMainnetClient();
    const possibleAddress = await viemClient.getEnsAddress({
      name: normalize(_possibleName),
    });
    if (!!possibleAddress) {
      return possibleAddress;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error({ e, where: "getAddressFromEns" });
  }

  return undefined;
};
