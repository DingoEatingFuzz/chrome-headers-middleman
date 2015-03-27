import HeaderRuleList from './header-rule-list'

export default React.createClass({
  render() {
    return (
      <div>
        <label>
          <h3>/<input type="text" placeholder="your\.regex\.here" />/</h3>
        </label>
        <HeaderRuleList />
      </div>
    )
  }
})