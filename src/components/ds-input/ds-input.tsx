import { AttachInternals, Component, Event, EventEmitter, h, Prop } from '@stencil/core';

export type InputType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

let nextId = 0;

@Component({ tag: 'ds-input', styleUrl: 'ds-input.css', shadow: true, formAssociated: true })
export class DsInput {
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
  @Prop() name?: string;
  /** Native input type. */
  @Prop() type: InputType = 'text';
  /** Native autocomplete token. */
  @Prop() autocomplete?: string;

  /** Fires as the user edits. Detail contains the current string value. */
  @Event() dsInput!: EventEmitter<string>;

  private readonly controlId = `ds-input-${++nextId}`;

  componentWillLoad() {
    this.syncFormValue();
  }

  formResetCallback() {
    this.value = '';
    this.syncFormValue();
  }

  private syncFormValue() {
    // Stencil's mock DOM does not implement form association; real browsers do.
    this.internals.setFormValue?.(this.disabled ? null : this.value);
  }

  private handleInput = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value;
    this.syncFormValue();
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
          disabled={this.disabled}
          id={this.controlId}
          onInput={this.handleInput}
          part="input"
          placeholder={this.placeholder}
          readOnly={this.readonly}
          required={this.required}
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
