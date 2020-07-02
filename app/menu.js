export default [
    {
      key: 'home',
      permissionKey: ['YDD.home'],
      link: '/',
      icon: 'iconfont dashbord',
      description: '首页',
      transform: icon => {
        return <i className={icon} />;
      }
    }, 
    {
      key: 'blog',
      description: '文章',
      children: [
        {
          key: 'blog.edit',
          link: '/blog/edit',
          description: '添加文章'
        },
        {
          key: 'blog.list',
          link: '/blog',
          description: '文章列表'
        }
      ]
    }
  ];
  