import URLRule from './url-rule'

export default React.createClass({
  render() {
    return (
      <div>
        <ul className="rule-list">
          <li><URLRule /></li>
          <li><URLRule /></li>
        </ul>
        <button>Add Another Rule</button>
      </div>
    )
  }
})