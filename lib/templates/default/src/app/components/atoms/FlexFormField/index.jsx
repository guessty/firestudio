import React from 'react';
import { Field } from 'react-final-form';
//
import Flex from '@atoms/Flex';

require('./FlexFormField.scss');

export default class FlexFormField extends React.PureComponent {
  static defaultProps = {
    className: '',
    componentClassName: '',
    component: 'input',
    label: '',
    placeholder: '',
    onChange: () => {},
    disabled: false,
    multiple: false,
    type: 'text',
  }

  getFieldClassNames(meta) {
    const { label, type, disabled } = this.props;

    return `
      FlexFormField
      FlexFormField--${type}
      ${disabled ? 'FlexFormField--disabled' : ''}
      ${(meta.error && (!meta.pristine && meta.submitFailed)) || (meta.submitFailed && !meta.dirtySinceLastSubmit)
    ? 'FlexFormField--hasError' : ''}
      ${meta.valid && (meta.dirty || meta.submitFailed) ? 'FlexFormField--isValid' : ''}
      ${label ? 'FlexFormField--hasLabel' : ''}
    `;
  }

  handleChange(e, input) {
    const { onChange } = this.props;
    const { target } = e;
    if (target.type === 'checkbox' || target.type === 'radio') {
      input.onChange(target.checked);
      onChange(target.checked);
    } else if (target.type === 'select-multiple') {
      const { options } = target;
      const value = [...options].filter(option => option.selected).map(option => option.value);
      input.onChange(value);
      onChange(value);
    } else {
      input.onChange(target.value);
      onChange(target.value);
    }
  }

  render() {
    const {
      label, disabled, name, className, multiple,
      component, componentClassName, ...fieldProps
    } = this.props;
    const id = `input-${name}`;

    const selectProps = component === 'select' ? { multiple } : {};

    return (
      <Field
        name={name}
        subscription={{
          touched: true,
          valid: true,
          dirty: true,
          pristine: true,
          error: true,
          submitError: true,
          submitFailed: true,
          dirtySinceLastSubmit: true,
        }}
        render={({ meta, input }) => (
          <div className={this.getFieldClassNames(meta)}>
            <Flex className={`flex-between-2 ${className}`} key={name}>
              {label && (
                <label className="FlexFormField__label" htmlFor={id}>
                  {label}
                </label>
              )}
              <Field
                data-lpignore="true"
                name={name}
                {...fieldProps}
                component={component}
                className={`FlexFormField__input ${componentClassName}`}
                id={id}
                onChange={e => this.handleChange(e, input)}
                disabled={disabled}
                {...selectProps}
              />
            </Flex>
          </div>
        )}
      />
    );
  }
}
