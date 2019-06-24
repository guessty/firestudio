
const defaultTransition = 'all 150ms ease-out';
const slowTransition = 'all 300ms ease-out';
const sharpTransition = 'all 150ms cubic-bezier(.32,1.03,.53,1.37)';

// speed
const slow = '350ms';
const normal = '250ms';
const fast = '150ms';
const instant = '1ms';

// delay
const none = '0ms';
const short = '150ms';
const medium = '250ms';
const long = '150ms';

// easing
const ease = 'ease';
const easeOut = 'ease-out';
const easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1)';

module.exports = {
  '.transition': {
    'transition-property': 'all',
    'transition-delay': '0s',

    // speeds
    '&-speed': {
      '&--slow': {
        'transition-duration': slow,
      },
      '&--normal': {
        'transition-duration': normal,
      },
      '&--fast': {
        'transition-duration': fast,
      },
      '&--instant': {
        'transition-duration': instant,
      },
    },

    // delay
    '&-delay': {
      '&--none': {
        'transition-delay': none,
      },
      '&--short': {
        'transition-delay': short,
      },
      '&--medium': {
        'transition-delay': medium,
      },
      '&--long': {
        'transition-delay': long,
      },
    },

    // easing
    '&-easing': {
      '&--ease': {
        'transition-timing-function': ease,
      },
      '&--ease-out': {
        'transition-timing-function': easeOut,
      },
      '&--ease-out-back': {
        'transition-timing-function': easeOutBack,
      },
    },

    // fade
    '&--fade': {
      '&-enter': {
        opacity: '0',
      },
      '&-enter-active, &-exit': {
        opacity: '1',
      },
      '&-exit-active': {
        opacity: '0',
      },
    },
    '&--no-fade': {
      '&-enter': {
        opacity: '0.99999',
      },
      '&-enter-active, &-exit': {
        opacity: '1',
      },
      '&-exit-active': {
        opacity: '0.99999',
      },
    },

    // absolute
    '&--absolute': {
      '&-enter, &-enter-active, &-exit, &-exit-active': {
        position: 'absolute',
      },
    },

    // types
    '&--slide': {
      '&-up': {
        '&-enter': {
          transform: 'translateY(100vh)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateY(0)',
        },
        '&-exit-active': {
          transform: 'translateY(-100vh)',
        },
      },
      '&-down': {
        '&-enter': {
          transform: 'translateY(-100vh)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateY(0)',
        },
        '&-exit-active': {
          transform: 'translateY(100vh)',
        },
      },
      '&-right': {
        '&-enter': {
          transform: 'translateX(-100vw)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateX(0)',
        },
        '&-exit-active': {
          transform: 'translateX(100vw)',
        },
      },
      '&-left': {
        '&-enter': {
          transform: 'translateX(100vw)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateX(0)',
        },
        '&-exit-active': {
          transform: 'translateX(-100vw)',
        },
      },
    },
    '&--shift': {
      '&-up': {
        '&-enter': {
          transform: 'translateY(1.25rem)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateY(0)',
        },
        '&-exit-active': {
          transform: 'translateY(-1.25rem)',
        },
      },
      '&-down': {
        '&-enter': {
          transform: 'translateY(-1.25rem)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateY(0)',
        },
        '&-exit-active': {
          transform: 'translateY(1.25rem)',
        },
      },
      '&-right': {
        '&-enter': {
          transform: 'translateX(-1.25rem)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateX(0)',
        },
        '&-exit-active': {
          transform: 'translateX(1.25rem)',
        },
      },
      '&-left': {
        '&-enter': {
          transform: 'translateX(1.25rem)',
        },
        '&-enter-active, &-exit': {
          transform: 'translateX(0)',
        },
        '&-exit-active': {
          transform: 'translateX(-1.25rem)',
        },
      },
    },

    '&--update': {

      '&-fade': {
        animation: 'TransitionFade 200ms ease-out',
        '@keyframes TransitionFade': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },

      '&-fade-down': {
        animation: 'TransitionFadeDown 200ms ease-out',
        '@keyframes TransitionFadeDown': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0', transform: 'translateY(1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      '&-fade-up': {
        animation: 'TransitionFadeUp 200ms ease-out',
        '@keyframes TransitionFadeUp': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0', transform: 'translateY(-1.25rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      '&-down': {
        animation: 'TransitionDown 200ms ease-out',
        '@keyframes TransitionDown': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(1.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

      '&-up': {
        animation: 'TransitionUp 200ms ease-out',
        '@keyframes TransitionUp': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.25rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
};
