export default React.createClass({
  render() {
    return (
      <div className="header-rule">
        <input type="text"/>
        :
        <input type="text"/>
        or
        <button className="active">Remove this header</button>
      </div>
    )
  }
})