import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit
}from '../views'

export const mainRouter=[{
  pathname:'/login',
  component:Login
},
{
  pathname:'/404',
  component:NotFound
},
]


export const adminRouter=[
  {
    pathname:'/admin/dashboard',
    component:Dashboard,
    title:'仪表盘',
    isNav:true,
    icon:'dashboard'
  },
  
  {
    pathname:'/admin/article',
    component:ArticleList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'ordered-list'
  },
  {
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
   
  },
  {
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:'edit'
  },
]