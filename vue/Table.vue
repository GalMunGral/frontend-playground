<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th></th>
          <th 
            v-for="(column, i) in columns"
            :key="i"
            draggable="true"
            @dragstart="columnDragStart($event, i)"
            @dragover.prevent
            @drop="columnDrop($event, i)"
            @click="sortByColumn(i)"
          >
            <div class="header">
              <span v-bind:class="{'header-highlight': meta.order[0].column === i}">
                  {{ column }}
              </span>
              <span>
                <span v-bind:class="{'header-highlight': isAsc(i)}">
                  <i class="fas fa-long-arrow-alt-up"></i>
                </span>
                <span v-bind:class="{'header-highlight': isDesc(i) }">
                  <i class="fas fa-long-arrow-alt-down"></i>
                </span>
              </span>
            </div>  
          </th>
        </tr>
        <tr>
          <th class="checkbox">
            <input type="checkbox"
              v-bind:checked="allSelected"
              @click="toggleSelectAll"/>
          </th>
          <th v-for="(column, i) in columns" :key="i">
            <div class="search-field">
              <i class="fas fa-search"></i>
              <input type="text" @keyup="searchByColumn(i, $event)"/>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="h-100">
        <tr v-for="(record, i) in records" :key="i" draggable="true" _id="record['leads:id']">
          <td>
            <input type="checkbox"
              v-bind:checked="selected.includes(i)"
              @click="toggleSelect(i)"/>
          </td>
          <td v-for="(column, i) in meta.columns" :key="i">
            {{ record[column.data] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="footer">
      <div class="nav-btn" @click="goBack">
          <i class="fas fa-caret-left"></i> Pre
      </div>
      <div class="pagination">
        <div v-for="n in 4" @click="goToPage(startPage + n -1)" v-bind:key="n"
          v-bind:class="{'highlight': currentPage === startPage + n - 1}">
          {{startPage + n - 1}}
        </div>
      </div>
      <div class="nav-btn" @click="goForward">
        Next <i class="fas fa-caret-right"></i>
      </div>
      <select  @change="setPageLength($event.target.value)">
        {{meta.length}} <i class="fas fa-caret-down"></i>
        <option v-for="n in [25, 50, 100, 1000]"
          v-bind:key="n" v-bind:value="n">{{n}}</option>
      </select>
    </div>
  </div> 
</template>

<script>
  export default {
    mounted() {
      this.fetch();
    },

    data() {
      return {
        total: 0,
        startPage: 1,
        selected: [],
        meta: {
          start: 0,
          length: 25,
          order: [{ column: 4, dir: 'desc' }],
          search: { value: '', regex: 'false' },
          columns: [
            { data: 'leads:id', search: { value: '', regex: 'false' } },
            { data: 'lead_details:first_name', search: { value: '', regex: 'false' } },
            { data: 'lead_details:company_name', search: { value: '', regex: 'false' } },
            { data: 'leads:referral_source', search: { value: '', regex: 'false' } },
            { data: 'leads:status', search: { value: '', regex: 'false' } },
            { data: 'leads:modified', search: { value: '', regex: false } }
          ]
        },
        selectedColumn: { index: 0, x: 0 },
        records:[ ]
      }        
    },

    computed: {
      columns: function() {
        return this.meta.columns.map(function(column) {
          return column.data.split(':')[1].replace('_', ' ')
        })
      },
      allSelected() {
        return this.selected.length === this.meta.length;
      },
      currentPage() {
        return parseInt(this.meta.start / this.meta.length) +1
      }
    },

    methods: {
      // Convert nested JSON to query string
      flatten:  function(o_obj, f_obj={}, pre='') {
        for (let key in o_obj) {
          let full_key = pre === '' ? key : pre + `[${key}]`;
          let val = o_obj[key]
          if (typeof(val) === 'object') {
            if (Array.isArray(val)) {
              val = Object.assign({}, val);
            }
            f_obj = this.flatten(val, f_obj, full_key)
          } else {
            f_obj[full_key] = o_obj[key]
          }
        }
        return f_obj
      },

      fetch: function() {
        let that = this;
        let query = this.flatten(this.meta);
          axios.post('/en/datatable/leads', this.meta)
          .then(function (response) {
            let resData = response.data;
            let data = resData.data;
            that.records = resData.data;
            that.total = resData.recordsTotal;
            console.log('new data:', that.records);

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      goBack: function() {
        if (this.startPage === 1) {
          return;
        }
        this.startPage -= 4;
        this.meta.start -= 4 * this.meta.length;  
        this.fetch();              
      },
      goForward: function() {
        console.log(this.total)
        if ((this.startPage + 4) * this.meta.length > this.total) {
          return;
        }
        this.startPage += 4;
        this.meta.start += 4 * this.meta.length;    
        this.fetch();            
      },
      goToPage: function(n) {
        this.meta.start = (n-1) * this.meta.length;
        this.fetch();
      },
      toggleSelect(selected) {
        if (!this.selected.includes(selected)) {
          this.selected.push(selected)
        } else {
          this.selected = this.selected.filter(i => {
            return i !== selected;
          })
        }
      },
      toggleSelectAll() {
        if (this.selected.length < this.meta.length) {
          this.selected = [];
          for (let i = 0; i < this.meta.length; i++) {
            this.selected.push(i);
          }
        } else {
          this.selected = [];
        }
      },
      setPageLength(n) {
        this.meta.length = n;
        this.fetch();
      },

      sortByColumn(i) {
        let order = this.meta.order[0];
        if (order.column !== i) {
          order.column = i;
          order.dir = 'asc';
        } else {
          order.dir = (order.dir === 'asc') ? 'desc' : 'asc'; 
        }
        this.fetch();
      },

      searchByColumn(i, event) {
        this.meta.columns.forEach(function(column) {
          column.search.value = '';
        })
        this.meta.columns[i].search.value = event.target.value;
        this.fetch();
      },

      isAsc(i) {
        return (
          this.meta.order[0].column === i && this.meta.order[0].dir === 'asc'
        );
      },

      isDesc(i) {
        return (
          this.meta.order[0].column === i && this.meta.order[0].dir === 'desc'
        );
      },

      columnDragStart(event, i) {
        let rect = event.target.closest('th').getBoundingClientRect();
        this.selectedColumn.x = rect.x + rect.width/2;
        this.selectedColumn.index = i;
      },

      columnDrop(event, i) {
        if (i === this.selectedColumn.index) { return; }
        let rect = event.target.closest('th').getBoundingClientRect();
        let targetX = rect.x + rect.width/2;
        let movedColumn = this.meta.columns.splice(this.selectedColumn.index, 1)[0];
        let targetIndex = (targetX < this.selectedColumn.x) ? i : i - 1;
        if (event.clientX < targetX) {
          this.meta.columns.splice(targetIndex, 0, movedColumn);
        } else {
          this.meta.columns.splice(targetIndex + 1, 0, movedColumn);
        }
        this.fetch();
      }
    }
  }
</script>

<style lang="scss" scoped>
    /* omitted */
</style>
