<template>
    <div class="layout">
        <div class="menu" v-for="(chapter,index) in chapters" :key="chapter.chapterId">
            <router-link :to="{name:'read',params:{chapterId:chapter.chapterId}}">第{{chapter.chapterIndex}}章   {{chapter.chapterName}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                chapters:null
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
                this.$http.post("http://localhost:8080/bookstore/chapter/getChapterList.html",{bookId:this.$route.params.bookId},{emulateJSON:true}).then(function (response) {
                    var data = response.body;
                    this.chapters = data.chapterList;
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .layout{
        position:relative;
        overflow: hidden;
        margin-left:15px;
        margin-top:10px;
        width:1235px;
    }
    .menu{
        text-align: left;
        width:30%;
        padding-left:30px;
        float:left;
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom:1px dashed #8da1ab;
    }
</style>