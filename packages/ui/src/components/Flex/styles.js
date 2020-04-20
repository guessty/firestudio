module.exports = (theme) => {
  const styles = {};
  const padding = theme('padding');
  Object.keys(padding).forEach((variation) => {
    styles[`&.gap-between-${variation}`] = {
      margin: `calc(-${padding[variation]} / 2)`,
      padding: '0',
      '& > *': {
        padding: `calc(${padding[variation]} / 2)`,
      },
    };

    styles[`&.gap-around-${variation}`] = {
      margin: '0',
      padding: `calc(${padding[variation]} / 2)`,
      '& > *': {
        padding: `calc(${padding[variation]} / 2)`,
      },
    };

    styles[`&.gap-${variation}`] = {
      margin: `calc(-${padding[variation]} / 2)`,
      padding: '0',
      '& > *': {
        padding: `calc(${padding[variation]} / 2)`,
      },
    };

    styles[`&.gap-${variation}.p-${variation}`] = {
      margin: '0',
      padding: `calc(${padding[variation]} / 2)`,
      '& > *': {
        padding: `calc(${padding[variation]} / 2)`,
      },
    };
  });

  return {
    '.flex': styles,
  };
};
