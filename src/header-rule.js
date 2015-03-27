export default React.createClass({
  render() {
    return (
      <div className="header-rule">
        <button className="trash">&times;</button>
        <input type="text"/>
        :
        <input type="text"/>
        or
        <button>Remove this header</button>
      </div>
    )
  }
})