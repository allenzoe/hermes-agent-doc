// @ts-check
// Documentation: https://docusaurus.io/docs/api/docusaurus-config
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hermes Agent',
  tagline: 'The agent that grows with you',
  url: 'https://hermes-agent.nousresearch.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment
  organizationName: ' NousResearch', // Usually your GitHub org/user name.
  projectName: 'hermes-agent', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.ts',
          // Please do not remove the comments
          // They are used to generate the "Show last update" timestamp
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // Point to Chinese translation
          lastVersion: 'current',
          versions: {
            current: {
              label: 'English',
              path: '',
            },
          },
        },
        blog: false,
        pages: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // i18n configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      'zh-CN': {
        label: '中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      },
    },
  },

  themeConfig: /** @type {import('@docusaurus/theme-default').ThemeConfig} */
      ({
        // We'll use the default navbar config
        // Your GitHub username or organization.
        image: 'img/hermes-og-image.png',
        navbar: {
          title: 'Hermes Agent',
          logo: {
            alt: 'Hermes Agent Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'docs',
              position: 'left',
              docId: 'index',
            },
            // Language selector dropdown
            {
              type: 'localeDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/NousResearch/hermes-agent',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          copyright: `Copyright © ${new Date().getFullYear()} Hermes Agent, built by Nous Research.`,
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
        // Local search plugin
        algolia: false,
      }),

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').Options} */
      ({
        // https://www.npmjs.com/package/@easyops-cn/docusaurus-search-local
        hashed: true,
        language: ['en', 'zh-CN'],
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/asciinema-player@3/assets/asciinema-player.css',
      type: 'text/css',
    },
  ],

  scripts: [
    'https://cdn.jsdelivr.net/npm/asciinema-player@3/asciinema-player.js',
  ],
};

export default config;