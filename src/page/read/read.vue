<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
    <div class="total">
        <div class="sidebar side" data-background-color="white" data-active-color="danger">
            <nav class="col-sm-3 navbar-fixed-top mynv">
                <ul class="nav">
                    <li class="active">
                        <div class="card card-block setting">
                            <el-popover
                                    ref="popover2"
                                    placement="right"
                                    title="章节详情"
                                    width="400"
                                    trigger="click"
                                    v-model="visible1">
                                <div class="chapters">
                                    <div v-for="ch1 in chapters" v-if="chapters" class="chapter12">
                                        <a href="javascript:void(0)" @click="hide(ch1.chapterId)">
                                        第{{ch1.chapterIndex}}章 {{ch1.chapterName}}
                                        </a>
                                    </div>
                                </div>
                            </el-popover>
                            <el-button v-popover:popover2  @click="ml">
                                <i class="fa fa-list-ul" aria-hidden="true"></i>
                                <p class="ic">目录</p>
                            </el-button>
                        </div>
                    </li>
                    <li>
                        <div class="card card-block setting">
                            <el-button>
                                <i class="fa fa-cog" aria-hidden="true"></i>
                                <p class="ic">设置</p>
                            </el-button>
                        </div>
                    </li>
                    <li>
                        <div class="card card-block setting">
                            <el-button @click="goBook">
                                <i class="fa fa-file-text-o" aria-hidden="true"></i>
                                <p class="ic">书页</p>
                            </el-button>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="container all">
            <div class="container-fluid">
                <div class="panel panel-success" v-if="chapter">
                    <h2>第{{chapter.chapterIndex}}章 {{chapter.chapterName}}</h2>
                    <div class="text" v-html="chapter.content">
                    </div>
                </div>
                <div class=" menu">
                    <button class="btn btn-default inf " @click="goLast">上一章</button>
                    <button class="btn btn-default inf " @click="goBook">目录</button>
                    <button class="btn btn-default inf" @click="goNext">下一章</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        data(){
            return {
                chapter: null,
                chapters:null,
                visible1:false
            }
        },
        created(){
            this.fetchData();
        },
        mount(){
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                this.$http.post("http://localhost:8080/bookstore/chapter/getChapter.html", {chapterId: this.$route.params.chapterId}, {emulateJSON: true}).then(function (response) {
                    var data = response.body;
                    this.chapter = data.chapter;
                }, function (error) {
                    console.log(error);
                });
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            goBook(){
                this.$router.push({name: 'book', params: {bookId: this.chapter.bookId}});
            },
            goNext(){
                $('body').scrollTop(0);
                this.$router.push({name: 'read', params: {chapterId: this.chapter.chapterId + 1}});
            },
            goLast(){
                if (this.chapter.chapterIndex > 1) {
                    $('body').scrollTop(0);
                    this.$router.push({name: 'read', params: {chapterId: this.chapter.chapterId - 1}});
                }
            },
            ml(){
                this.$http.post("http://localhost:8080/bookstore/chapter/getChapterList.html",{bookId:this.chapter.bookId},{emulateJSON:true}).then(function (response) {
                    var data = response.body;
                    this.chapters = data.chapterList;
                }, function (error) {
                    console.log(error);
                });
                $(function () {
                    $("[data-toggle='popover']").popover();
                });
            },
            hide(id){
                this.visible1=false;
                $('body').scrollTop(0);
                this.$router.push({name:'read',params:{chapterId:id}});
            }
        }
    }
</script>
<style scoped>
    .all {
        margin-top: 100px;
        width: 1000px;
        margin-bottom: 100px;
        float: left;
    }

    .text {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        line-height: 40px;
        text-align: left;
        margin-left: 20px;
        font-size: 20px;
    }

    .menu {
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        line-height: 40px;
        font-size: 20px;
        margin-top: 50px;
    }

    .inf {
        float: left;
        text-align: center;
        width: 312.5px;
    }

    .total {
        overflow: hidden;
    }

    .side {
        float: left;
        margin-top: 100px;
        margin-left: 200px;
        width: 100px;
    }

    .setting {
        /*width: 50px;
        border: 1px solid #b0bec5;
        margin: auto;
        padding-top: 5px;*/
    }
    .setting .ic{
        margin-top:10px;
    }
    .mynv {
        margin-top:160px;
        margin-left:80px;
    }
    .chapters{
        overflow: scroll;
        height:500px;
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        font-size: 10px;
    }
    .chapter12{
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        font-size: 15px;
    }
</style>