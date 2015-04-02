import HeaderRuleList from './header-rule-list'

export default React.createClass({
  remove() {
    this.props.onRemove(this.props.rule)
  },

  patternChange(e) {
    this.props.rule.pattern = e.target.value
    this.props.onChange(this.props.rule)
  },

  newHeader(header) {
    this.props.rule.headers.push(header);
    this.props.onChange(this.props.rule);
  },

  updateHeader(header) {
    var index
    this.props.rule.headers.forEach((x, i) => x.id === header.id && (index = i))
    this.props.rule.headers.splice(index, 1, header)
    this.props.onChange(this.props.rule)
  },

  removeHeader(header) {
    var index
    this.props.rule.headers.forEach((x, i) => x.id === header.id && (index = i))
    this.props.rule.headers.splice(index, 1)
    this.props.onChange(this.props.rule)
  },

  render() {
    return (
      <div className="rule">
        <label>
          <h3>/<input type="text" placeholder="your\.regex\.here" value={this.props.rule.pattern} onChange={this.patternChange} />/</h3>
        </label>
        <button className="trash" onClick={this.remove}>&times;</button>
        <HeaderRuleList rule={this.props.rule} onNewHeader={this.newHeader} onUpdatedHeader={this.updateHeader} onRemovedHeader={this.removeHeader}/>
      </div>
    )
  }
})