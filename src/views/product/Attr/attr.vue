<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性
        </el-button>
        <!--表格：展示平台属性-->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id"
                      style="margin: 0px 10px">{{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--添加属性|修改属性-->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
        </el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width: 100%;margin:20px 0px" border :data="attrInfo.attrValueList">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <!--这里需要用到span与input来回切换-->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini" v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"></el-input>
              <span v-else @click="toEdit(row,$index)" style="display: block">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!--气泡确认框-->
              <el-popconfirm :title="`确定删除${row.valueName}？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//按需引入
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      //接收平台属性的字段
      attrList: [],
      //控制table的显示与隐藏
      isShowTable: true,
      //收集新增属性|修改属性使用的
      attrInfo: {
        attrName: '',//属性名
        attrValueList: [//属性值，因为属性值可以有多个，所以用数组
          // {
          //   attrId:0,//相应的属性名的id
          //   valueName:'',//属性值名称
          // }
        ],
        categoryId: 0,//三级分类的id
        categoryLevel: 3
      }
    }
  },
  methods: {
    //自定义事件的回调
    getCategoryId({categoryId, level}) {
      //区分三级分类的id
      if (level == 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        //发请求获取数据
        this.getAttrList()
      }
    },
    //获取平台属性的数据
    //当用户确定三级分类的id的时候，可以向服务器发请求进行数据展示
    async getAttrList() {
      const {category1Id, category2Id, category3Id} = this
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    //添加属性值的回调
    addAttrValue() {
      //向属性值的数组里面添加元素
      //attrId:对应的属性的id，目前是添加属性，还没有对应的属性id
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,//对于修改某一个属性，可以在已有的属性值上增加新的属性（新增的属性值要把已有的属性id带上）
        attrName: '',
        flag: true
      })
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    //添加属性按钮的回调
    addAttr() {
      //切换table显示与隐藏
      this.isShowTable = false
      //清除数据
      this.attrInfo = {
        attrName: '',//属性名
        attrValueList: [//属性值，因为属性值可以有多个，所以用数组
          // {
          //   attrId:0,//相应的属性名的id
          //   valueName:'',//属性值名称
          // }
        ],
        categoryId: this.category3Id,//三级分类的id
        categoryLevel: 3
      }
    },
    //修改某一个属性
    updateAttr(row) {
      //isShowTable变为false
      this.isShowTable = false
      //将选中的属性复制给attrInfo
      //由于数据结构里面存在对象里面套数组，数组里面套对象，因此需要深拷贝
      this.attrInfo = cloneDeep(row)
      //修改某一个属性，将相应的属性值元素添加flag元素
      this.attrInfo.attrValueList.forEach(item => {
        //这样也可以给属性值添加flag字段，但是视图不会跟着改变，因为flag不是响应式数据
        //Vue 无法探测普通的新增 property
        // item.flag = false
        //第一个参数：哪个对象；第二个参数：添加新的响应式属性；第三个参数：新的属性的属性值
        this.$set(item, 'flag', false)
      })
    },
    //失去焦点的回调
    //row是用户添加的最新的属性值
    toLook(row) {
      //属性值不能为空，如果为空需要给用户提示
      if (row.valueName.trim() == '') {
        this.$message('请输入正确的属性值')
        return
      }
      //新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some(item => {
        //判断的时候将row从数组里面去除
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (isRepat) return
      //编辑模式变为查看模式
      row.flag = false
    },
    //点击span的回调，变为编辑模式
    toEdit(row, index) {
      row.flag = true
      //获取input节点，实现自动聚焦
      //点击span，切换为input模式，对于浏览器而言，页面重绘与重排是耗时间的，不可能点击的一瞬间就立马获取到input
      this.$nextTick(() => {
        //获取相应的input表单元素实现聚焦
        this.$refs[index].focus()
      })
    },
    //气泡确认框确定按钮的回调
    deleteAttrValue(index) {
      //当前操作不需要发请求
      this.attrInfo.attrValueList.splice(index,1)
    }
  }
}
</script>

<style scoped>

</style>
