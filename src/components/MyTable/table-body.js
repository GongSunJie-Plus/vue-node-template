export default {
  name: 'TableBody',
  props: {
    store: {
      type: Object,
      default: function() {
        return {};
      }
    },
    type: String
  },
  computed: {
    data() {
      // return this.store.data.map(item => {
      //   const t = [];
      //   for (const key in item) {
      //     t.push(item[key]);
      //   }
      //   return t;
      // })
      return this.store.data;
    },
    column() {
      return this.store.column;
    },
    hasGutter() {
      return true;
    },
    fixedCol() {
      return this.store.fixedCol;
    },
    isFixed() {
      return this.type === 'fixed'
    },
    renderCol() {
      return this.isFixed ? this.fixedCol : this.column;
    },
    tableW() {
      if (this.isFixed) return this.fixedCol.reduce((pre, cur) => pre.width + cur.width, { width: 0 });
      return this.store.w - (this.hasGutter ? 15 : 0);
    }
  },
  render(h) {
    console.log(this.tableW)
    return (
      <table
        id={ this.store.id }
        class={ ['my-table-body', { 'fixed': this.isFixed }] }
        style={
          `${this.store.headerStyle};
          width: ${this.tableW}px;
          table-layout: fixed;
          text-align: center;
          border-spacing: 0px;`
        }
      >
        <tbody>
          { this.data.map(item => {
            return h('tr', this.renderCol.map((inner) => h('td', {
              class: { 'my-table-body-td': true },
              style: { width: (inner.width + 'px') || 'auto' }
            }, [h('div', item[inner.props])])));
          }) }
        </tbody>
      </table>
    )
  }
}