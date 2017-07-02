<template>
    <div class="container all">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-9 col-md-6 col-lg-12">
                    <div class="panel panel-success to">
                    <div class="pic" v-if="book">
                        <img :src="'http://localhost/static/'+book.pic"/>
                    </div>
                    <div class="des" v-if="book">
                        <p>
                            <strong class="bookname">{{book.bookName}}</strong>
                            <span class="author">{{book.author}} 著</span>
                        </p>
                        <span class="label label-default">默认标签</span>
                        <span class="label label-primary">主要标签</span>
                        <span class="label label-success">成功标签</span>
                        <span class="label label-info">信息标签</span>
                        <span class="label label-warning">警告标签</span>
                        <span class="label label-danger">危险标签</span>
                        <p>{{book.description}}</p>
                        <p>21.86万字|4.48万总点击·会员周点击2940|1.87万总推荐·周3654</p>
                        <div class="bts">
                        <button class="btn btn-warning" @click="first_read">免费试读</button>
                        <button class="btn btn-danger bt1">加入书架</button>
                        <button class="btn btn-success bt1">推荐投票</button>
                        </div>
                    </div>
                    <div class="right">
                        <p class="pf">7.6</p>
                        <p>17人评价</p>
                        <div class="block">
                            <span class="demonstration">我要评价</span>
                            <el-rate v-model="evaluation"></el-rate>
                        </div>
                        <div class="dl" v-if="book"><a :href="'http://localhost/static/'+book.bookName+'.txt'" :download="book.Name+'.txt'"><i class="fa fa-download" aria-hidden="true"></i>下载</a></div>
                    </div>
                    </div>
                </div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="作品详情" name="first"></el-tab-pane>
                <el-tab-pane label="目录（749章）" name="second"></el-tab-pane>
                <el-tab-pane label="讨论（500）" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="bbb">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                evaluation: 1,
                activeName: 'second',
                book:null
            }
        },
        created(){
            this.fetchData();
        },
        watch:{
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                this.$http.post("http://localhost:8080/bookstore/book/getBook.html", {bookId: this.$route.params.bookId}, {emulateJSON: true}).then(function (response) {
                    var data = response.body;
                    this.book = data.book;
                }, function (error) {
                    console.log(error);
                });
            },
            handleClick(tab, event) {
                if(this.activeName == second){
                    this.$router.push({name: 'chapters'});
                }
            },
            first_read(){
                this.$http.post("http://localhost:8080/bookstore/chapter/getFirstChapterId.html",{bookId:this.$route.params.bookId},{emulateJSON:true}).then(function (response) {
                    var data = response.body;
                    this.$router.push({name:'read',params:{chapterId:data.firstChapterId}});
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .pic{
        float:left;
        padding:20px 0 20px 20px;
    }
    .right{
        margin-top:30px;
        float:right;
        line-height: 20px;
    }
    .des{
        float:left;
        margin-left:20px;
        margin-top:30px;
        text-align: left;
        line-height: 30px;
        width:600px;
    }
    .all{
        margin-top:200px;
        margin-left:200px;
    }
    .to{
        border-bottom: hidden;
        overflow: hidden;
        position: relative;
    }
    .bookname{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        font-size: 30px;
    }
    .author{
        margin-left: 20px;
    }
    .bt1{
        margin-left:30px;
    }
    .pf{
        font-family: "Times New Roman";
        font-size: 40px;
    }
    .dl{
        margin-top:60px
    }
    .bbb{
        width:100%;
    }
</style>