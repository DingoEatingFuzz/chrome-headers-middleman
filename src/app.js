import URLRuleList from './url-rule-list'
import DB from './db'

export default React.createClass({
  getInitialState() {
    return { data: null }
  },

  componentDidMount() {
    this.db = new DB(d => this.setState({ data: d}))
  },

  render() {
    console.log(this.db, this.state)
    return (
      <div>
        <h1>Headers Middleman</h1>
        <URLRuleList />
      </div>
    )
  }
})
