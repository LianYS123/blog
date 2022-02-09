import React from "react";
import routers from "routers";
export const Nav20DataSource = {
  isScrollLink: true,
  wrapper: { className: "header2 home-page-wrapper" },
  page: { className: "home-page" },
  logo: {
    className: "header2-logo kyzknyobhad-editor_css",
    children:
      "https://blog-1259462774.cos.ap-shanghai.myqcloud.com/illustrations/%E6%98%9F%E8%BD%A8.svg"
  },
  LinkMenu: {
    className: "header2-menu",
    children: [
      {
        name: "linkNav",
        to: routers.HOME,
        children: "首页",
        className: "menu-item active"
      },
      {
        name: "linkNav~kyzmiq0v89f",
        to: routers.ARTICLE_LIST,
        children: "文章",
        className: "menu-item"
      },
      {
        name: "linkNav~kyzmiyd5o7",
        to: routers.ESSAY,
        children: "动态",
        className: "menu-item"
      },
      {
        name: "linkNav~kyzmj59nff",
        to: routers.NOT_FOUND,
        children: "关于",
        className: "menu-item"
      }
    ]
  },
  mobileMenu: { className: "header2-mobile-menu" }
};
export const Banner00DataSource = {
  wrapper: { className: "banner0 kyz95hxzzdj-editor_css" },
  textWrapper: { className: "banner0-text-wrapper kyz9c84aal-editor_css" },
  title: {
    className: "banner0-title kyz8vqex17d-editor_css",
    children:
      "https://blog-1259462774.cos.ap-shanghai.myqcloud.com/illustrations/%E6%98%9F%E8%BD%A8.svg"
  },
  content: {
    className: "banner0-content kyz954gym18-editor_css",
    children: (
      <span>
        <span>
          <p>Lian's Blog</p>
        </span>
      </span>
    )
  },
  button: { className: "banner0-button", children: "Learn More" }
};
export const Feature10DataSource = {
  wrapper: {
    className: "home-page-wrapper content1-wrapper kyzlisv0anh-editor_css"
  },
  OverPack: {
    className: "home-page content1 kyzl8f26nyu-editor_css",
    playScale: 0.3
  },
  imgWrapper: { className: "content1-img", md: 10, xs: 24 },
  img: {
    children:
      "https://blog-1259462774.cos.ap-shanghai.myqcloud.com/illustrations/%E7%AA%97.svg"
  },
  textWrapper: { className: "content1-text", md: 14, xs: 24 },
  title: {
    className: "content1-title kyzldwjqu1h-editor_css",
    children: (
      <span>
        <span>
          <span>
            <p>会记录什么？</p>
          </span>
        </span>
      </span>
    )
  },
  content: {
    className: "content1-content kyzlekhb55-editor_css",
    children: (
      <span>
        <span>
          <span>
            <span>
              <span>
                <span>
                  <span>
                    <span>
                      <p>记录生活。我要如何生活？我会如何生活？</p>
                      <p>记录知识。从技术到学科，记录我感兴趣的知识。</p>
                      <p>
                        记录心情。走在路上，心情和情感不断起伏，想把这些变化记录下来。
                      </p>
                      <p>
                        记录想法。过多的想法使人孤独，而它却又是一切主观创造的原料。
                      </p>
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        </span>
      </span>
    )
  }
};
export const Footer20DataSource = {
  wrapper: { className: "home-page-wrapper footer2-wrapper" },
  OverPack: { className: "home-page footer2", playScale: 0.05 },
  copyright: {
    className: "copyright",
    children: [
      {
        name: "copyright",
        children: (
          <span>
            <p>Copyright © LianYS</p>
          </span>
        ),
        className: "copyright-text"
      }
    ]
  },
  links: {
    className: "links",
    children: [
      {
        name: "weibo",
        href: "https://github.com/LianYS123",
        className: "links-weibo kyzoqc7u5m-editor_css",
        children:
          "https://blog-1259462774.cos.ap-shanghai.myqcloud.com/icon/github.svg"
      },
      {
        name: "zhihu",
        href: "https://leetcode-cn.com/u/lianys123/",
        className: "links-zhihu kyzoqx6ectc-editor_css",
        children:
          "https://blog-1259462774.cos.ap-shanghai.myqcloud.com/icon/leetcode.svg"
      }
    ]
  }
};
