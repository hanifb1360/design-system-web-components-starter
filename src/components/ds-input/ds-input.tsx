import {
  AttachInternals,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
  Watch,
  forceUpdate,
} from '@stencil/core';

export type InputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

let nextId = 0;

/**
 * A labeled, form-associated text field with description and validation support.
 *
 * @part input - Native input control.
 */
@Component({ tag: 'ds-input', styleUrl: 'ds-input.css', shadow: true, formAssociated: true })
export class DsInput {
  @Element() host!: HTMLDsInputElement;
  @AttachInternals() internals!: ElementInternals;

  /** Current value. */
  @Prop({ mutable: true }) value = '';
  /** Visible accessible label. */
  @Prop() label!: string;
  /** Supporting description. */
  @Prop() description?: string;
  /** Error text shown while invalid. */
  @Prop({ attribute: 'error-message' }) errorMessage?: string;
  /** Require a value. */
  @Prop({ reflect: true }) required = false;
  /** Disable interaction and form submission. */
  @Prop({ reflect: true }) disabled = false;
  /** Prevent edits without disabling the control. */
  @Prop({ reflect: true }) readonly = false;
  /** Communicate an invalid value. */
  @Prop({ reflect: true }) invalid = false;
  /** Native placeholder. */
  @Prop() placeholder?: string;
  /** Form field name. */
  @Prop({ reflect: true }) name?: string;
  /** Native input type. */
  @Prop() type: InputType = 'text';
  /** Native autocomplete token. */
  @Prop() autocomplete?: string;

  /** Fires as the user edits. Detail contains the current string value. */
  @Event() dsInput!: EventEmitter<string>;

  private readonly controlId = `ds-input-${++nextId}`;
  private formDisabled = false;
  private initialValue = '';
  private input?: HTMLInputElement;

  componentWillLoad() {
    this.initialValue = this.value;
    this.syncFormState();
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.syncFormState();
  }

  formDisabledCallback(disabled: boolean) {
    this.formDisabled = disabled;
    this.syncFormState();
    queueMicrotask(() => forceUpdate(this.host));
  }

  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === 'string') this.value = state;
    this.syncFormState();
  }

  @Watch('disabled')
  @Watch('errorMessage')
  @Watch('invalid')
  @Watch('required')
  @Watch('value')
  protected syncFormState() {
    const unavailable = this.disabled || this.formDisabled;
    // Stencil's mock DOM does not implement form association; real browsers do.
    this.internals.setFormValue?.(unavailable ? null : this.value, this.value);

    if (!this.internals.setValidity) return;
    if (this.invalid) {
      this.internals.setValidity(
        { customError: true },
        this.errorMessage || 'The value is invalid.',
        this.input,
      );
    } else if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, 'Complete this field.', this.input);
    } else if (this.input && !this.input.validity.valid) {
      this.internals.setValidity(
        { typeMismatch: this.input.validity.typeMismatch },
        this.input.validationMessage,
        this.input,
      );
    } else {
      this.internals.setValidity({});
    }
  }

  private handleInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.syncFormState();
    this.dsInput.emit(this.value);
  };

  render() {
    const describedBy =
      [
        this.description ? `${this.controlId}-description` : '',
        this.invalid && this.errorMessage ? `${this.controlId}-error` : '',
      ]
        .filter(Boolean)
        .join(' ') || undefined;
    return (
      <div class="field">
        <label htmlFor={this.controlId}>
          {this.label}
          {this.required ? <span aria-hidden="true"> *</span> : null}
        </label>
        {this.description ? (
          <div class="description" id={`${this.controlId}-description`}>
            {this.description}
          </div>
        ) : null}
        <input
          aria-describedby={describedBy}
          aria-invalid={this.invalid ? 'true' : undefined}
          autocomplete={this.autocomplete}
          disabled={this.disabled || this.formDisabled}
          id={this.controlId}
          onInput={this.handleInput}
          part="input"
          placeholder={this.placeholder}
          readOnly={this.readonly}
          required={this.required}
          ref={element => (this.input = element)}
          type={this.type}
          value={this.value}
        />
        {this.invalid && this.errorMessage ? (
          <div class="error" id={`${this.controlId}-error`} role="alert">
            <ds-icon name="info" size="sm" />
            {this.errorMessage}
          </div>
        ) : null}
      </div>
    );
  }
}
