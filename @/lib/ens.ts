import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

/**
 * * Return true if address contains a two alphaneumeric sections, separated by
 * * a dot. Subnames will currently return false.
 */
export const isPossiblyEns = (address: string): boolean => {
  return !!address.match(/\w+\.\w+/g);
};

export const retreiveENSFromAddress = async ({
  _address,
}: {
  _address: `0x${string}`;
}): Promise<string | null> => {
  if (!isPossiblyEns(_address)) return null;
  const viemClient = getMainnetClient();
  let _ensName = null;
  if (_address.length === 40) {
    _ensName = await viemClient.getEnsName({ address: _address });
  }
  return _ensName;
};

export const getMainnetClient = () => {
  if (!process?.env?.NEXT_PUBLIC_INFURA_ID) {
    throw new Error("NEXT_PUBLIC_INFURA_ID is not set");
  }
  const infuraUrl = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`;
  const transport = http(infuraUrl);

  return createPublicClient({
    chain: mainnet,
    transport,
  });
};
