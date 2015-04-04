import React from 'react'

export default React.createClass({
  getInitialState() {
    return {
      value: this.props.header.value || ''
    }
  },

  remove() {
    this.props.onRemove(this.props.header)
  },

  updateName(e) {
    this.props.header.name = e.target.value
    this.props.onChange(this.props.header)
  },

  updateValue(e) {
    this.props.header.value = e.target.value
    this.state.value = e.target.value
    this.props.onChange(this.props.header)
  },

  toggleRemoved() {
    var header = this.props.header
    if (header.value === null) header.value = this.state.value
    else header.value = null
    this.props.onChange(this.props.header)
  },

  removeState() {
    return this.props.header.value === null ? 'active' : 'inactive'
  },

  inactiveValueInput() {
    return this.props.header.value === null ? 'disabled' : ''
  },

  render() {
    return (
      <div className="header-rule">
        <button className="trash" onClick={this.remove}>&times;</button>
        <input type="text" value={this.props.header.name} onChange={this.updateName}/>
        :
        <input type="text" value={this.state.value} disabled={this.inactiveValueInput()} onChange={this.updateValue}/>
        or
        <button className={this.removeState()} onClick={this.toggleRemoved}>Remove this header</button>
      </div>
    )
  }
})