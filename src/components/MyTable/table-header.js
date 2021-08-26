export default {
  name: 'TableHeader',
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
    column() {
      return this.store.column;
    },
    hasGutter() {
      return true;
    },
    fixedCol() {
      return this.store.fixedCol;
    },
    hasFixed() {
      return this.fixedCol.length > 0;
    },
    isFixed() {
      return this.type === 'fixed'
    },
    renderData() {
      return this.isFixed ? this.fixedCol : this.column;
    },
    tableW() {
      return this.isFixed ? this.fixedCol.reduce((pre, cur) => pre.width + cur.width, {width: 0}) : this.store.w;
    }
  },
  render(h) {
    console.log(this.column)
    return (
    <table
      id={ this.store.id }
      class={ [ 'my-table-header', { 'fixed': this.hasFixed && this.isFixed } ] }
      style={
        `${this.store.headerStyle};
        width: ${this.tableW}px;
        table-layout: fixed;
        border-spacing: 0px;
        `
      }
    >
      <thead>
        <tr>
        { this.renderData.map(item => h('th', {
            class: {
              'my-table-header-td': true
            },
            style: {
              width: item.width && (item.width + 'px')
            }
          }, item.lable))
        }
        {
          (this.hasGutter && !this.isFixed) ? <th class="my-table-gutter"></th> : ''
        }
        </tr>
      </thead>
    </table>
    )
  }
}