import * as React from 'react';
import * as Unstated from 'unstated';
declare const Store: React.StatelessComponent<Unstated.ProviderProps>;
declare const StoreDebugger: {
    isEnabled: boolean;
};
declare class StateContainer extends Unstated.Container<any> {
    state: {};
    setState: (updater: object | ((prevState: object) => object), callback?: () => void) => Promise<void>;
}
export { Store, StoreDebugger, StateContainer, };
export declare const connect: (to: any) => (Component: any) => (props: any) => JSX.Element;
