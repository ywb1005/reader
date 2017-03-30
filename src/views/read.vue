<template>
  <div>
    <headers></headers>
    <div class="container" id="box">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/cat/' }" >{{catName}}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">{{bookName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="base_set">
        <ul style="padding: 0;margin: 0">
          <router-link :to="{path: '/book/'+this.$route.params.id}">
          <li class="set_list" style="border-right: 0px">
            <i class="fa fa-list fa-fw" style="color: black;"></i>
            <span class="set-spn">返回书籍</span>
          </li>
          </router-link>
          <li class="set_list" style="border-right: 0px" v-on:mouseover="showMenu"><i class="fa fa-wrench fa-fw"></i><span class="set-spn">选择背景</span>
            <ul class="down-menu">
            <li class="down-list" v-for="theme in themeList" @click="changeColor(theme.id)" v-bind:class="{'change-down':flag==theme.id}">{{theme.name}}</li>
          </ul></li>
          <li class="set_list" @click="changeMoon" id="moon"><i class="fa fa-moon-o fa-fw"></i><span class="set-spn">夜间模式</span></li>
        </ul>
      </div>
      <div class="content">
          <img style="width: 200px; " src="../../static/img/book.jpg">
        <div class="content_txt">
          <p class="txt-p" v-for="content in contentList">{{content.text}}</p>
        </div>
      </div>
      <div class="select-section">
          <ul style="padding: 0;margin:0 auto;display:table;">
            <li class="select-section-list">上一章</li>
            <li class="select-section-list">
              <el-button type="text" @click="dialogTableVisible = true" style="padding: 6px">目录</el-button>
              <el-dialog title="全部章节" v-model="dialogTableVisible">
                  <ul style="padding: 0;margin:0 auto;display:table;">
                    <li class="book-menu" v-for="book in bookInfo"><span>第{{book.id}}章  {{book.name}}</span></li>
                  </ul>
              </el-dialog>
            </li>
            <li class="select-section-list">下一章</li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import headers from 'components/header.vue'
  import navbars from 'components/navbar.vue'
  export default {
    components: {
      headers, navbars
    },
    data () {
      return {
        catName: '存储',
        activeName: 'first',
        bookName: '盗天仙途',
        bookId: 1,
        form: {
          name: ''
        },
        dialogTableVisible: false,
        isMoon: true,
        flag: 1,
        author: '荆轲守',
        contentList: [
          {id: 11,
            text: '在古代西方社会，夜晚是非常危险的时段，失火、盗窃、抢劫，一 切都有可能。于是有了一个叫作守夜人的职业。他们在黑夜里一言不发， 在出现险情时发出警报，这让人们得以睡个好觉。' +
          '在美剧《权力的游戏》 中，守夜人又变换了角色。他们在边境长城阻挡异鬼，让长城内的人类 得以安居乐业。买卖、赠与、婚嫁，这儿是法律的自由乐土；贪污、诈骗、 抢劫，这儿是法律的地狱恶道。在中国，检察官们手持侦查、' +
          '控诉、监 督三种武器，筑起法律的边境长城，划分自由与不自由的界限。我们就 是法律的守夜人。在平时不显山、不露水，用一双冷眼观世界，但当违 法犯罪出现的时候，也就是检察官的正义之剑出鞘的时刻。'},
          {id: 12,
            text: '法官、律师和检察官是法律人最常选择的三个职业。说到法官，大 家就会想到一个戴着白色假发的男人，' +
            '身着黑色法袍，在法庭正中正襟危 坐，不苟言笑；说到律师，大家就会想到一个红光满面的中年男人，' +
            '在法 庭上西装革履，侃侃而谈；而说到检察官，大家却似乎跟断片儿了似的， 想不起来什么东西，这或许跟检察官的低调有关。'},
          {id: 12,
            text: '法官、律师和检察官是法律人最常选择的三个职业。说到法官，大 家就会想到一个戴着白色假发的男人，' +
            '身着黑色法袍，在法庭正中正襟危 坐，不苟言笑；说到律师，大家就会想到一个红光满面的中年男人，' +
            '在法 庭上西装革履，侃侃而谈；而说到检察官，大家却似乎跟断片儿了似的， 想不起来什么东西，这或许跟检察官的低调有关。'},
          {id: 12,
            text: '法官、律师和检察官是法律人最常选择的三个职业。说到法官，大 家就会想到一个戴着白色假发的男人，' +
            '身着黑色法袍，在法庭正中正襟危 坐，不苟言笑；说到律师，大家就会想到一个红光满面的中年男人，' +
            '在法 庭上西装革履，侃侃而谈；而说到检察官，大家却似乎跟断片儿了似的， 想不起来什么东西，这或许跟检察官的低调有关。'},

          {id: 22, text: '无敌更好'}
        ],
        bookInfo: [
        {id: 11, name: '蔑视真的是'},
        {id: 12, name: '骑士'},
        {id: 13, name: '无敌'},
        {id: 14, name: '蔑视'},
        {id: 15, name: '骑士'},
        {id: 16, name: '无敌'},
        {id: 17, name: '蔑视'},
        {id: 18, name: '骑士'},
        {id: 19, name: '无敌'},
        {id: 20, name: '蔑视'},
        {id: 21, name: '骑士'},
        {id: 22, name: '无敌更好'}
        ],
        commentList: [
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 2, user: '大师傅似的', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 2, user: '大师傅似的', info: '大师傅大师傅但是示范点发射点顺丰速递'},
          {id: 1, user: '叶伟标', info: '大师傅大师傅但是示范点发射点顺丰速递'}
        ],
        themeList: [
          {id: 1, name: '默认'},
          {id: 2, name: '浅灰'},
          {id: 3, name: '蓝色'},
          {id: 4, name: '绿色'},
          {id: 5, name: '深灰'}
        ]
      }
    },
    methods: {
      changeColor (id = 1) {
        this.flag = id
        switch (id) {
          case 1:
            document.body.style.backgroundColor = 'antiquewhite'
            document.getElementById('box').style.backgroundColor = '#fcf5ed'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#fcf5ed'
            break
          case 2:
            document.body.style.backgroundColor = '#efefef'
            document.getElementById('box').style.backgroundColor = '#f7f7f7'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#f7f7f7'
            break
          case 3:
            document.body.style.backgroundColor = '#d2e6fa'
            document.getElementById('box').style.backgroundColor = '#ebf5ff'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#ebf5ff'
            break
          case 4:
            document.body.style.backgroundColor = '#d2efc3'
            document.getElementById('box').style.backgroundColor = '#eafae1'
            document.getElementById('box').style.color = 'black'
            document.getElementById('moon').style.backgroundColor = '#eafae1'
            break
          case 5:
            document.body.style.backgroundColor = '#201c1d'
            document.getElementById('box').style.backgroundColor = '#353434'
            document.getElementById('box').style.color = '#9a9a9a'
            document.getElementById('moon').style.backgroundColor = '#4db3ff'
            this.isMoon = false
            break
        }
        document.getElementsByClassName('down-menu')[0].style.display = 'none'
      },
      showMenu () {
        document.getElementsByClassName('down-menu')[0].style.display = 'block'
      },
      changeMoon () {
//        console.log(this.isMoon)
        if (this.isMoon) {
          this.changeColor(5)
          document.getElementById('moon').style.backgroundColor = '#4db3ff'
          this.isMoon = false
        } else {
          this.changeColor(1)
          this.isMoon = true
        }
      }
    }
  }
</script>
<style scoped>
  body{
    background-color: antiquewhite;
  }
  .container{
    width: 1190px;
    height: auto;
    margin: 80px auto 0;
    border: 1px solid #8c939d;
    border-radius: 4px;
    box-shadow: 0 0 5px #dcdcdc;
    background-color: #fcf5ed;
  }
  .breadcrumb{
  	width: 600px;
    margin-top: 20px;
    margin-left: 4%;
    float: left;
  }
  .breadcrumb .el-breadcrumb{
    height: 20px;
    padding-top: 20px;
    font-size: 18px;
  }
  .base_set{
    margin-right: 6%;
    float: right;
  }
  .set_list{
    width: 100px;
    height: 30px;
    float: left;
    cursor: pointer;
    padding-top: 5px;
    margin-top: 20px;
    border: 1px solid #8c939d;
  }
  .set-spn{
    line-height: normal;
    font-size: 18px;
    color: black;
  }
  .set-spn:hover{
    color: #eeeeee;
  }
  .set_list:hover{
    background-color: #4db3ff;
  }
  .content{
    width: 90%;
    height: auto;
    clear: both;
    margin: 0 auto;
    border-bottom: 1px solid #8c939d;
  }
  .txt-p{
    font-size: 18px;
    text-indent: 2cm;
    line-height: 1.8;
    margin: 0.8em;
  }
  .select-section{
    width: 90%;
    height: 100px;
    margin: 10px auto;
  }
  .select-section-list{
    padding: 10px 20px;
    font-size: 18px;
    float: left;
    margin-left:20px;
    margin-top: 40px;
    border-radius: 4px;
    border: 1px solid #8c939d;
  }
  .select-section-list:hover{
    background-color: #afddff;
    color: bisque;
    cursor: pointer;
  }
  .down-menu{
    padding: 0;
    cursor: pointer;
    border: 1px solid #8c939d;
    margin-top: 6px;
    display: none;
  }
  .down-menu .down-list{
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    padding-top: 5px;
    padding-left: 5px;
  }
  .down-menu .down-list:hover{
    background-color: #f5f5f5;
  }
  .change-down{
    background-color: #4db3ff;
  }
  .book-menu{
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 200px;
    border-bottom: 1px solid #8c939d;
  }
  .book-menu span:hover{
    color: #dea726;
  }
</style>
