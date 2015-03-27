import HeaderRuleList from './header-rule-list'

export default React.createClass({
  render() {
    return (
      <div className="rule">
        <label>
          <h3>/<input type="text" placeholder="your\.regex\.here" />/</h3>
        </label>
        <button className="trash">&times;</button>
        <HeaderRuleList />
      </div>
    )
  }
})