import HeaderRule from './header-rule'

export default React.createClass({
  add() {
    var headers = this.props.rule.headers
    var id = 1
    if (headers.length > 0) id = headers[headers.length - 1].id + 1

    this.props.onNewHeader({
      id,
      name: '',
      value: ''
    })
  },

  remove(header) {
    this.props.onRemovedHeader(header)
  },

  change(header) {
    this.props.onUpdatedHeader(header)
  },

  render() {
    var rules = this.props.rule.headers.map(header => (
      <li><HeaderRule header={header} onRemove={this.remove} onChange={this.change} /></li>
    ))
    return (
      <div>
        <ul className="header-list">
          {rules}
        </ul>
        <button onClick={this.add}>Add Another Header</button>
      </div>
    )
  }
})