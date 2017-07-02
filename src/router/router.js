/**
 * Created by Leafqun on 2017/6/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import bookList from '../page/book/bookList.vue'
import book from '../page/book/book.vue'
import chapters from '../page/book/chapters.vue'
import read from '../page/read/read.vue'

Vue.use(Router)

export default new Router({
    routes:[
        { path: '', redirect: '/bookList'},
        { path: '/bookList', name: 'bookList', component: bookList},
        { path: '/book/:bookId', name: 'book', component:book,
            children:[
                { path: '', redirect:'chapters'},
                { path: 'chapters',name:'chapters',component:chapters}
            ]
        },
        { path: '/read/:chapterId', name: 'read', component:read}
    ]
})