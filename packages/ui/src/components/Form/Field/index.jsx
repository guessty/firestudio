import React, { PureComponent } from 'react';
import { Field } from 'react-final-form';
//

export default class FormField extends PureComponent {
  static defaultProps = {
    className: '',
    componentClassName: '',
    component: 'input',
    label: '',
    placeholder: '',
    onChange: () => {},
    disabled: false,
    multiple: false,
    validate: false,
    type: 'text',
  }

  getFieldClassNames(meta) {
    const {
      className, label, type,
      disabled, validate,
    } = this.props;

    return `
      form-field
      form-field--${type}
      ${disabled ? 'form-field--disabled' : ''}
      ${validate ? `
        ${(meta.error && (!meta.pristine && meta.submitFailed))
          || (meta.submitFailed && !meta.dirtySinceLastSubmit) ? 'form-field--hasError' : ''}
        ${meta.valid && (meta.dirty || meta.submitFailed) ? 'form-field--isValid' : ''}
      ` : ''}
      ${label ? 'form-field--hasLabel' : ''}
      ${className}
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
      validate, component, componentClassName,
      ...fieldProps
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
            {label && (
              <div className="form-field__container">
                <label className="form-field__label" htmlFor={id}>
                  {label}
                </label>
              </div>
            )}

            <div className="form-field__container">
              <Field
                data-lpignore="true"
                name={name}
                {...fieldProps}
                component={component}
                className={`form-field__input ${componentClassName}`}
                id={id}
                onChange={e => this.handleChange(e, input)}
                disabled={disabled}
                {...selectProps}
              />
            </div>
          </div>
        )}
      />
    );
  }
}
