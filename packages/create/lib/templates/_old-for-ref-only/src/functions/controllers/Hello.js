import Base from './Base';

export default class Hello extends Base {
  post() {
    this.res.status(200).json({
      data: {},
      message: 'Hello from the cloud!',
    });

    return null;
  }
}
