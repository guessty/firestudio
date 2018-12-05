import * as React from 'react'
import styled from 'styled-components'

interface IFlexProps {
  children: any
  className?: string
}

interface IFlexChildProps {
  children: any
  _flexClassName?: string
  ['data-flexClassName']?: string
}

export default class Flex extends React.PureComponent<IFlexProps> {
  static permittedClassNames = {
    // Direction
    'flex-col': true,
    'flex-col-reverse': true,
    'flex-row': true,
    'flex-row-reverse': true,
    // Wrapping
    'flex-no-wrap': true,
    'flex-wrap': true,
    'flex-wrap-reverse': true,
    // Align Items
    'items-stretch': true,
    'items-start': true,
    'items-center': true,
    'items-end': true,
    'items-baseline': true,
    // Justify Content
    'justify-start': true,
    'justify-center': true,
    'justify-end': true,
    'justify-between': true,
    'justify-around': true,
    // Gutter
    'gap-0': true,
    'gap-1': true,
    'gap-2': true,
    'gap-3': true,
    'gap-4': true,
    'gap-5': true,
    'gap-6': true,
    'gap-8': true,
    'gap-10': true,
    'gap-12': true,
    'gap-16': true,
    'gap-20': true,
    'gap-24': true,
    'gap-32': true,
    'gap-between': true,
    'gap-around': true,
  }

  static permittedChildClassNames = {
    // Flex, Grow, & Shrink
    'flex-initial': true,
    'flex-1	flex': true,
    'flex-auto': true,
    'flex-none': true,
    'flex-grow': true,
    'flex-shrink': true,
    'flex-no-grow': true,
    'flex-no-shrink': true,
    // Width
    'w-auto': true,
    'w-px': true,
    'w-1/2': true,
    'w-1/3': true,
    'w-2/3': true,
    'w-1/4': true,
    'w-3/4': true,
    'w-1/5': true,
    'w-2/5': true,
    'w-3/5': true,
    'w-4/5': true,
    'w-1/6': true,
    'w-5/6': true,
    'w-full': true,
    'w-screen': true,
    // Height
    'h-auto': true,
    'h-px': true,
    'h-full': true,
    'h-screen': true,
  }

  static gapSizes = {
    'gap-0': 0,
    'gap-1': '0.25rem',
    'gap-2': '0.5rem',
    'gap-3': '0.75rem',
    'gap-4': '1rem',
    'gap-5': '1.25rem',
    'gap-6': '1.5rem',
    'gap-8': '2rem',
    'gap-10': '2.5rem',
    'gap-12': '3rem',
    'gap-16': '4rem',
    'gap-20': '5rem',
    'gap-24': '6rem',
    'gap-32': '8rem',
  }

  static getClassName(className, permittedClassNames) {
    return className.split(' ').reduce((finalClassName, splitClass) => {
      const breakpointClassName = splitClass.split(':')
      const parsedSplitClass = breakpointClassName.length > 1 ? breakpointClassName[1] : splitClass
      
      if (Flex.gapSizes[parsedSplitClass]) {
        return `${finalClassName}${splitClass} `
      }

      if (permittedClassNames[parsedSplitClass]) {
        return `${finalClassName}${splitClass} `
      }
      return finalClassName
    }, '')
  }

  static getStyles() {
    return Object.keys(Flex.gapSizes).reduce((finalClasses, size) => {
      return `
        ${finalClasses}
        &.${size} {
          padding: calc(${Flex.gapSizes[size]} / 2);
          margin: -${Flex.gapSizes[size]};

          > div {
            display: flex;
            align-items: inherit;
            justify-content: inherit;
            padding: calc(${Flex.gapSizes[size]} / 2);
          }

          &.gap-between {
            margin: -${Flex.gapSizes[size]};
          }

          &.gap-around {
            margin: 0;
          }
        }
      `
    }, '')
  }

  hasFlexDirection() {
    const { className } = this.props

    const directions = {
      'flex-col': true,
      'flex-col-reverse': true,
      'flex-row': true,
      'flex-row-reverse': true,
    }

    return className.split(' ').find(splitClass => directions[splitClass])
  }

  renderChildren() {
    const { children } = this.props

    return React.Children.map(children, (child: React.ReactElement<IFlexChildProps>) => {
      // Wrap any children in a div to prevent potential css flex layout overrides.
      if (child) {

        const { _flexClassName, ['data-flexClassName']: dataFlexClassName, ...remainingChildProps } = child.props 

        const childFlexClassName = dataFlexClassName || _flexClassName
  
        const WrappedChild = React.createElement('div', {
          className: childFlexClassName ? Flex.getClassName(childFlexClassName, Flex.permittedChildClassNames) : ''
        }, child.props ? {
          ...child,
          props: remainingChildProps,
        } : child)
      
        return WrappedChild
      }
      return null
    })
  }

  render() {
    const { className } = this.props

    const StyledFlex = styled.div`
      flex-grow: 1;
      ${Flex.getStyles()}
    `

    return (
      <StyledFlex
        className={`flex ${!this.hasFlexDirection() ? 'flex-col' : ''} ${Flex.getClassName(className, Flex.permittedClassNames)}`}
      >
        {this.renderChildren()}
      </StyledFlex>
    )
  }
}