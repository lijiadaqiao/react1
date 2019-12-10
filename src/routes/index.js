import {
  Dashboard,
  Login,
  NotFound,
  Settings,
  ArticleList,
  ArticleEdit,
  Notifications,
  NoAuth,
  Profile
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
    icon:'dashboard',
    roles:['001','002','003']
  },
  
  {
    pathname:'/admin/article',
    component:ArticleList,
    exact:true,
    title:'文章管理',
    isNav:true,
    icon:'ordered-list',
    roles:['001','002']
  },
  {
    pathname:'/admin/article/edit/:id',
    component:ArticleEdit,
    roles:['001','002']
  },
  {
    pathname:'/admin/notifications',
    component:Notifications,
    roles:['001','002','003']
  },
  {
    pathname:'/admin/noauth',
    component:NoAuth,
    roles:['001','002','003']
  },
  {
    pathname:'/admin/profile',
    component:Profile,
    roles:['001','002','003']
  },
  {
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    isNav:true,
    icon:'edit',
    roles:['001']
  },
]