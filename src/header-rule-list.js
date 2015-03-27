import HeaderRule from './header-rule'

export default React.createClass({
  render() {
    return (
      <div>
        <ul className="header-list">
          <li><HeaderRule /></li>
        </ul>
        <button>Add Another Header</button>
      </div>
    )
  }
})