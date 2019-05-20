import Container from '@store/containers/Base';

export default class Modal extends Container {
  state = {}

  hasOpenModals() {
    return Object.values(this.state).some(modal => modal && modal.isOpen);
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
    if (this.hasOpenModals()) {
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
