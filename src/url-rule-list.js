import URLRule from './url-rule'

export default React.createClass({
  add() {
    var rules = this.props.rules
    var id = 1
    if (rules.length > 0) id = rules[rules.length - 1].id + 1

    this.props.onNewRule({
      id,
      pattern: '',
      headers: []
    })
  },

  update(rule) {
    this.props.onUpdatedRule(rule)
  },

  remove(rule) {
    this.props.onRemovedRule(rule)
  },

  render() {
    var rules = this.props.rules.map(rule => (
      <li><URLRule rule={rule} onChange={this.update} onRemove={this.remove} /></li>
    ))
    console.log(rules.length)

    return (
      <div>
        <ul className="rule-list">
          {rules}
        </ul>
        <button onClick={this.add}>Add Another Rule</button>
      </div>
    )
  }
})