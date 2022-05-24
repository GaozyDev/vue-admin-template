<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" placeholder="SPU描述" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--上传图片：action图片上传的地址 list-type:文件列表的类型 on-preview:点击文件列表中已上传的文件时的钩子 on-remove:文件列表移除文件时的钩子
        file-list:上传的文件列表【是数组，数组里面的元素务必要有name和url属性】-->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!--展示的是当前spu属于自己的销售属性-->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80px" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <!---->
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!--@keyup.enter.native="handleInputConfirm"
                -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <!-- @click="showInput"-->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="$emit('changeScene',0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      //spu初始化的时候是一个空对象，点击修改按钮，会向服务器发请求，返回spu信息（是一个对象），在修改的时候可以利用服务器返回的对象收集最新的数据提交给服务器
      //添加spu：点击添加spu按钮并不会向服务器发请求，关于数据收集到哪里？收集哪些字段？要看文档
      spu: {
        //三级分类的id
        "category3Id": 0,
        //描述
        "description": '',
        //品牌的id
        "tmId": 0,
        //spu名称
        "spuName": '',
        //收集spu图片的信息
        "spuImageList": [
          // {
          //   "id":0,
          //   "imageName":'string',
          //   "imageUrl":'string',
          //   "spuId":0
          // }
        ],
        //平台属性与属性值的收集
        "spuSaleAttrList": [
          // {
          //   "baseSaleAttrId":0,
          //   "id":0,
          //   "saleAttrName":'string',
          //   "spuId":0,
          //   "spuSaleAttrValueList":[
          //     {
          //       "baseSaleAttrId":0,
          //       "id":0,
          //       "isChecked":'string',
          //       "saleAttrName":'string',
          //       "saleAttrValueName":'string',
          //       "spuId":0
          //     }
          //   ]
          // }
        ],
      },
      tradeMarkList: [],//存储品牌的信息
      spuImageList: [],//存储spu图片
      saleAttrList: [],//获取平台全部的销售属性
      attrIdAndAttrName:'',//收集未选择的销售属性的id
    }
  },
  methods: {
    //删除照片的回调
    handleRemove(file, fileList) {
      //file是删除的那张图片
      //fileList是剩余的图片
      // console.log(file, fileList);
      //收集照片数据
      //目前数据中有name和url字段，将来提交给服务器的数据要去掉这俩字段
      this.spuImageList = fileList
    },
    //照片墙预览的回调
    handlePictureCardPreview(file) {
      //图片的地址
      this.dialogImageUrl = file.url;
      //对话框显示
      this.dialogVisible = true;
    },
    //添加照片的回调
    handleSuccess(response, file, fileList) {
      //收集图片
      this.spuImageList = fileList
    },
    //初始化SpuForm数据
    async initSpuDate(spu) {
      //获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code == 200) {
        this.spu = spuResult.data
      }
      //获取品牌的信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      //获取spu图片的数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data
        //由于照片墙显示图片的数据需要数组，数组里面的元素需要有name和url字段
        //需要吧服务器返回来的数据进行修改
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        //把整理好的数据赋值给spuImageList
        this.spuImageList = listArr
      }
      //获取平台全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code = 200) {
        this.saleAttrList = saleResult.data
      }
    },
    //添加新的销售属性
    addSaleAttr() {
      //把收集到的数据进行分割，因为有的信息我不需要
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
      //向spu对象的spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      //添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
      //清空数据
      this.attrIdAndAttrName = ''
    },
    //添加按钮的回调
    addSaleAttrValue(row) {
      //点击销售属性值的添加按钮时，需要由button变为input，通过inputVisible控制
      this.$set(row,'inputVisible',true)
      //通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row,'inputValue','')
    },
    //el-input失去焦点的回调
    handleInputConfirm(row) {
      //解构出需要收集的数据
      const {baseSaleAttrId,inputValue} = row
      //新增的销售属性值名称不能为空
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        return
      }
      //新增的属性值不能重复，也可以用some
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
      if(!result) return
      //新增的销售属性值
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      //新增
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      //显示button
      row.inputVisible = false
    },
    //保存按钮的回调
    async addOrUpdateSpu() {
      //整理参数，除了照片，其他的参数都整理好了
      //对于照片需要携带imgName和imgUrl字段
      this.spu.spuImageList = this.spuImageList.map(item=>{
        return {
          imgName:item.name,
          imgUrl:(item.response&&item.response.data)||item.url
        }
      })
      //发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code==200){
        //提示
        this.$message({type:'success',message:'保存成功'})
        //通知父组件回到场景0
        this.$emit('changeScene',0)
      }
    }
  },
  computed: {
    //计算出还未选择的销售属性
    unSelectSaleAttr() {
      //整个平台的销售属性一共有三个：颜色、版本、尺寸---saleAttrList
      //当前spu属于自己的销售属性spu.spuSaleAttrList
      //数组的过滤，在已有的数据当中过滤出用户需要的数据，返回一个新的数组
      let result = this.saleAttrList.filter((item) => {
        //every数组的方法，会返回一个布尔值，要么真要么假
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
}

</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
