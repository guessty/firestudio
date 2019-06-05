import getConfig from 'next/config';
import PrismicJS from 'prismic-javascript';

export default class Prismic {
  static CONTENT_TYPES = {
    CAROUSEL: 'carousel',
    TEXT: 'text',
  };

  static FIELD_VALUES = {
    // Image/Content Layout
    'Layered (Centered)': 'default',
    'Layered (Left Aligned)': 'layered-left',
    'Layered (Right Aligned)': 'layered-right',
    'Split (Image | Content)': 'split-left',
    'Split (Content | Image)': 'split-right',
    'Stacked (Image / Content)': 'stacked-above',
    'Stacked (Content / Image)': 'stacked-below',
  };

  static async getApi() {
    const { publicRuntimeConfig } = getConfig();

    const api = await PrismicJS.getApi(publicRuntimeConfig.PRISMIC.API_URL, {
      accessToken: publicRuntimeConfig.PRISMIC.ACCESS_TOKEN,
    });

    return api;
  }

  static async queryById(api, ids, options = {}) {
    const queryIds = Array.isArray(ids) ? ids : [ids];
    const response = await api.query(Prismic.Predicates.in('document.id', queryIds), options);

    return response;
  }

  static async queryByType(api, type, options = {}) {
    const response = await api.query(Prismic.Predicates.at('document.type', type), options);

    return response;
  }

  static async getByType(type) {
    const api = await Prismic.getApi();
    const response = await Prismic.queryByType(api, type, {});

    const [page] = [response.results[0]];

    if (!page) {
      return {};
    }

    const linkedIds = Object.values(page.data)
      .reduce((ids, value) => ((value && value.id) ? [...ids, value.id] : ids), []);

    const { results } = await Prismic.queryById(api, linkedIds, {});

    const formattedContent = Prismic.mapKeys(page.data, results);

    return formattedContent;
  }

  static getPageData = Prismic.getByType

  static mapKeys(pageData, resultsArr) {
    return Object.keys(pageData).reduce((data, key) => {
      const itemId = pageData[key].id;
      const element = resultsArr.find(ele => ele.id === itemId) || {};
      const { type } = pageData[key];

      const formattedElement = Prismic.FormatFactory(type, element);

      if (typeof formattedElement !== 'undefined') {
        // eslint-disable-next-line no-param-reassign
        data[key] = formattedElement;
      }

      return data;
    }, { ...pageData });
  }

  // Below are the factories that will convert prismic data into a format
  // that our components can understand

  static FormatFactory(type, element) {
    switch (type) {
      case Prismic.CONTENT_TYPES.CAROUSEL:
        return Prismic.FormatCarousel(element);
      case Prismic.CONTENT_TYPES.TEXT:
        return Prismic.FormatText(element);
      default:
        return undefined;
    }
  }

  static FormatBanner(element) {
    const data = {
      content: undefined,
      image: { url: undefined },
      layout: undefined,
      ...element ? element.data : {},
    };

    return {
      content: data.content,
      imageUrl: data.image.url,
      layout: Prismic.FIELD_VALUES[data.layout],
    };
  }

  static FormatCarousel(element) {
    const data = {
      transition_style: undefined,
      items: [],
      ...element ? element.data : {},
    };

    return {
      items: data.items.map(item => Prismic.FormatBanner({
        data: item,
      })),
    };
  }

  static FormatText(element) {
    const data = {
      content: undefined,
      ...element ? element.data : {},
    };

    return {
      content: data.content,
    };
  }
}
