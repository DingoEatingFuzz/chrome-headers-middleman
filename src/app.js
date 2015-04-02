import URLRuleList from './url-rule-list'
import DB from './db'

export default React.createClass({
  getInitialState() {
    return {
      data: {
        rules: []
      }
    }
  },

  componentDidMount() {
    this.db = new DB(function(d) {
      d.rules = d.rules || []
      this.setState({ data: d })
    }.bind(this))
  },

  newRule(rule) {
    var state = this.state;
    state.data.rules.push(rule)
    this.setState(state)
  },

  updateRule(rule) {
    var index
    var state = this.state
    state.data.rules.forEach((x, i) => x.id === rule.id && (index = i))
    state.data.rules.splice(index, 1, rule)
    this.setState(state)
    this.save()
  },

  removeRule(rule) {
    var index
    var state = this.state
    state.data.rules.forEach((x, i) => x.id === rule.id && (index = i))
    state.data.rules.splice(index, 1)
    this.setState(state)
    this.save()
  },

  save() {
    this.db.set(this.state.data)
  },

  render() {
    console.log(this.state)
    var rules = this.state.data.rules.sort((a, b) => a.id - b.id)

    return (
      <div>
        <h1>Headers Middleman</h1>
        <URLRuleList rules={rules} onNewRule={this.newRule} onUpdatedRule={this.updateRule} onRemovedRule={this.removeRule} />
      </div>
    )
  }
})
