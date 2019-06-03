import { Container } from '@firestudio/core/store';

export default class Dialog extends Container {
  state = {}

  hasOpenDialogs() {
    return Object.values(this.state).some(dialog => dialog && dialog.isOpen);
  }

  async deregister(key) {
    await this.setState(state => ({
      ...state,
      [key]: undefined,
    }));
  }

  async register(key) {
    await this.setState(state => ({
      ...state,
      [key]: {
        isOpen: false,
      },
    }));
  }

  async close(key) {
    if (this.isOpen(key)) {
      await this.setOpen(key, false);
    }
  }

  async open(key) {
    await this.setOpen(key, true);
  }

  async closeAll(excludeKey) {
    if (this.hasOpenDialogs()) {
      await this.setState((state) => {
        const newState = {};
        Object.keys(state).forEach((key) => {
          newState[key] = key === excludeKey
            ? state[key]
            : { ...state[key], isOpen: false };
        });

        return newState;
      });
    }
  }

  isOpen(key) {
    return this.isRegistered(key) && this.state[key].isOpen === true;
  }

  isRegistered(key) {
    return this.state.hasOwnProperty(key) && this.state[key] !== undefined;
  }

  async toggle(key) {
    await this.closeAll(key);

    if (!this.state.hasOwnProperty(key)) {
      await this.register(key);
    }

    await this.setOpen(key, !this.state[key].isOpen);
  }

  async setOpen(key, isOpen = false) {
    if (this.isRegistered(key)) {
      await this.setState(state => ({
        [key]: {
          ...state[key],
          isOpen: isOpen === true,
        },
      }));
    }
  }
}
