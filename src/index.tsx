import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-open-im-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const OpenImSdk = NativeModules.OpenImSdk
  ? NativeModules.OpenImSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

function initSDK(a: number, b: number): Promise<number> {
  return OpenImSdk.initSDK(a, b);
}

export default {
  initSDK,
};
