import * as Unstated from 'unstated';
import { detailedDiff } from 'deep-object-diff';

export default class Container extends Unstated.Container {
  state = {}

  firebase

  constructor(state = {}, firebaseInstance) {
    super();
    this.state = state;
    this.firebase = firebaseInstance;
  }

  setState = async (updater, callback) => {
    const { name } = this.constructor;
    const prevState = { ...this.state };
    await super.setState(updater, callback);
    const newState = { ...this.state };

    if (typeof window !== 'undefined' && window.__FIREPRESS_STORE_DEBUGGER__.isEnabled) {
      const diff = detailedDiff(prevState, newState);

      console.groupCollapsed(name);
      const hasChanges = obj => !!Object.keys(obj).length;

      if (hasChanges(diff.added)) {
        console.log('Added\n', diff.added);
      }

      if (hasChanges(diff.updated)) {
        console.log('Updated\n', diff.updated);
      }

      if (hasChanges(diff.deleted)) {
        console.log('Deleted\n', diff.deleted);
      }

      console.log('New state\n', newState);
      console.log('Old state\n', prevState);
      console.groupEnd();
    }
  }
}
