import HeaderRuleList from './header-rule-list'

export default React.createClass({
  remove() {
    this.props.onRemove(this.props.rule)
  },

  patternChange(e) {
    this.props.rule.pattern = e.target.value
    this.props.onChange(this.props.rule)
  },

  render() {
    return (
      <div className="rule">
        <label>
          <h3>/<input type="text" placeholder="your\.regex\.here" value={this.props.rule.pattern} onChange={this.patternChange} />/</h3>
        </label>
        <button className="trash" onClick={this.remove}>&times;</button>
        <HeaderRuleList />
      </div>
    )
  }
})