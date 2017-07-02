<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-3 col-xs-6" v-for="(book,index) in books" :key="book.bookId">
                <div class="alert alert-info back-widget-set text-center">
                    <router-link :to="{name:'book',params:{bookId:book.bookId}}">
                        <div>
                            <img :src="'http://localhost/static/'+book.pic"/>
                            <h3>{{book.bookName}}</h3>
                            {{book.author}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                books: null
            }
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData () {
                this.$http.get("http://localhost:8080/bookstore/book/getAllBook.html").then(function (response) {
                    var data = response.body;
                    this.books = data.bookList;
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>